const fs = require('fs');
const path = require('path');

const appDir = path.join('.next', 'server', 'app');
function getHtmlFiles(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  for (const item of fs.readdirSync(dir)) {
    const full = path.join(dir, item);
    if (fs.statSync(full).isDirectory()) {
      results = results.concat(getHtmlFiles(full));
    } else if (item.endsWith('.html') && !item.includes('_not-found') && !item.includes('_global-error')) {
      results.push(full);
    }
  }
  return results;
}

const files = getHtmlFiles(appDir);
console.log('Total HTML files to inspect:', files.length);

const issues = {
  h1Missing: [],
  h1Multiple: [],
  h1Empty: [],
  canonicalMismatch: [],
  metaDescMissing: [],
  metaDescShort: [],
  metaDescLong: [],
  brokenLinks: new Map(),
  schemaErrors: [],
  missingSalary: [],
  hiddenFaqSchema: [],
  largeHtml: []
};

const routeSet = new Set();
files.forEach(f => {
  let r = f.replace(appDir, '').replace(/\\/g, '/').replace('/index.html', '').replace('.html', '') || '/';
  routeSet.add(r);
});
routeSet.add('/');
routeSet.add('/sitemap.xml');
routeSet.add('/robots.txt');

for (const f of files) {
  const html = fs.readFileSync(f, 'utf8');
  let route = f.replace(appDir, '').replace(/\\/g, '/').replace('/index.html', '').replace('.html', '') || '/';
  const sizeKb = Math.round(Buffer.byteLength(html, 'utf8') / 1024);
  if (sizeKb > 150) issues.largeHtml.push({ route, sizeKb });

  // H1 checks
  const h1s = html.match(/<h1\b[^>]*>(.*?)<\/h1>/gis) || [];
  if (h1s.length === 0) issues.h1Missing.push(route);
  else if (h1s.length > 1) issues.h1Multiple.push(route);
  else {
    const text = h1s[0].replace(/<[^>]+>/g, '').trim();
    if (!text) issues.h1Empty.push(route);
  }

  // Canonical
  const canMatch = html.match(/<link\s+rel=["']canonical["']\s+href=["'](.*?)["']/i);
  const expectedCan = 'https://canadanocguide.com' + (route === '/' ? '' : route);
  if (!canMatch || canMatch[1] !== expectedCan) {
    issues.canonicalMismatch.push({ route, got: canMatch ? canMatch[1] : null, expected: expectedCan });
  }

  // Meta description
  const descMatch = html.match(/<meta\s+name=["']description["']\s+content=["'](.*?)["']/i);
  if (!descMatch) {
    issues.metaDescMissing.push(route);
  } else {
    const desc = descMatch[1];
    if (desc.length < 50) issues.metaDescShort.push({ route, len: desc.length, desc });
    if (desc.length > 165) issues.metaDescLong.push({ route, len: desc.length, desc });
  }

  // Schema checks
  const scripts = html.match(/<script\s+type=["']application\/ld\+json["'][^>]*>(.*?)<\/script>/gis) || [];
  for (const s of scripts) {
    const raw = s.replace(/<script[^>]*>/i, '').replace(/<\/script>/i, '');
    try {
      const obj = JSON.parse(raw);
      if (obj['@type'] === 'Occupation') {
        if (!obj.estimatedSalary || obj.estimatedSalary.length === 0) {
          issues.missingSalary.push(route);
        }
      }
      if (obj['@type'] === 'FAQPage') {
        // check if questions in schema appear in html body outside scripts
        const bodyWithoutScripts = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
        const decodedBody = bodyWithoutScripts
          .replace(/&quot;/g, '"')
          .replace(/&#x27;/g, "'")
          .replace(/&amp;/g, '&');
        for (const q of obj.mainEntity || []) {
          if (!decodedBody.includes(q.name)) {
            issues.hiddenFaqSchema.push({ route, question: q.name });
          }
        }
      }
    } catch (e) {
      issues.schemaErrors.push({ route, err: e.message });
    }
  }

  // Links check
  const links = html.matchAll(/href=["']([^"']+)["']/g);
  for (const m of links) {
    const href = m[1];
    if (href.startsWith('/') && !href.startsWith('//') && !href.startsWith('/_next') && !href.startsWith('/favicon')) {
      const clean = href.split('?')[0].split('#')[0].replace(/\/$/, '') || '/';
      if (!routeSet.has(clean)) {
        if (!issues.brokenLinks.has(clean)) issues.brokenLinks.set(clean, []);
        issues.brokenLinks.get(clean).push(route);
      }
    }
  }
}

console.log('--- COMPREHENSIVE AUDIT RESULTS ---');
console.log('H1 Missing:', issues.h1Missing.length);
console.log('H1 Multiple:', issues.h1Multiple.length);
console.log('Canonical Mismatches:', issues.canonicalMismatch.length);
console.log('Meta Desc Missing:', issues.metaDescMissing.length);
console.log('Meta Desc Short (<50 chars):', issues.metaDescShort.length);
console.log('Meta Desc Long (>165 chars):', issues.metaDescLong.length);
if (issues.metaDescLong.length > 0) {
  console.log('Sample Long Meta Descriptions:', issues.metaDescLong.slice(0, 3));
}
console.log('Schema Parse Errors:', issues.schemaErrors.length);
console.log('Missing Salary in Occupation Schema:', issues.missingSalary.length);
console.log('Hidden FAQ items in JSON-LD not in body:', issues.hiddenFaqSchema.length);
if (issues.hiddenFaqSchema.length > 0) {
  console.log('Sample Hidden FAQ Schema items (first 5):', issues.hiddenFaqSchema.slice(0, 5));
}
console.log('Large HTML pages (>150KB):', issues.largeHtml.length);
if (issues.largeHtml.length > 0) {
  console.log('Sample large HTML:', issues.largeHtml.slice(0, 5));
}
console.log('Broken internal links:', issues.brokenLinks.size);
for (const [k, v] of issues.brokenLinks.entries()) {
  console.log('  Broken link:', k, 'Found on:', v.length, 'pages. First:', v[0]);
}
