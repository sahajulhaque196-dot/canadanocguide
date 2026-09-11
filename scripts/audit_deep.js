const fs = require('fs');
const path = require('path');

function getFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getFiles(fullPath, fileList);
    } else if (file.endsWith('.html')) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

const appHtmlDir = path.join('.next', 'server', 'app');
const htmlFiles = getFiles(appHtmlDir);
console.log('Total prerendered HTML files found:', htmlFiles.length);

let missingH1 = 0;
let multipleH1 = 0;
let missingCanonical = 0;
let missingDesc = 0;
let invalidJsonLd = 0;
let totalJsonLd = 0;
let longTitles = 0;
let shortTitles = 0;

// Build set of valid routes
const validRoutes = new Set();
htmlFiles.forEach(f => {
  let route = f.replace(appHtmlDir, '').replace(/\\/g, '/');
  if (route.endsWith('/index.html')) route = route.replace('/index.html', '');
  else if (route.endsWith('.html')) route = route.replace('.html', '');
  if (!route) route = '/';
  validRoutes.add(route);
});
validRoutes.add('/');
validRoutes.add('/robots.txt');
validRoutes.add('/sitemap.xml');

const unresolvedHrefs = new Map();
const titlesByRoute = new Map();
const schemaTypes = new Map();

for (const f of htmlFiles) {
  const html = fs.readFileSync(f, 'utf8');
  let currentRoute = f.replace(appHtmlDir, '').replace(/\\/g, '/').replace('.html', '').replace('/index', '') || '/';

  // Check Title
  const titleMatch = html.match(/<title\b[^>]*>(.*?)<\/title>/i);
  if (titleMatch) {
    const titleText = titleMatch[1];
    titlesByRoute.set(currentRoute, titleText);
    if (titleText.length > 70) longTitles++;
    if (titleText.length < 20) shortTitles++;
  }

  // Check H1
  const h1Matches = html.match(/<h1\b[^>]*>(.*?)<\/h1>/gi) || [];
  if (h1Matches.length === 0 && !f.includes('_not-found')) {
    missingH1++;
  } else if (h1Matches.length > 1) {
    multipleH1++;
  }

  // Check Canonical
  const canonicalMatch = html.match(/<link\s+rel=["']canonical["']\s+href=["'](.*?)["']/i);
  if (!canonicalMatch && !f.includes('_not-found')) {
    missingCanonical++;
    console.log('Missing Canonical in:', f);
  }

  // Check Description
  const descMatch = html.match(/<meta\s+name=["']description["']\s+content=["'](.*?)["']/i);
  if (!descMatch && !f.includes('_not-found')) {
    missingDesc++;
    console.log('Missing Description in:', f);
  }

  // Check JSON-LD
  const jsonLdMatches = html.match(/<script\s+type=["']application\/ld\+json["'][^>]*>(.*?)<\/script>/gis) || [];
  for (const m of jsonLdMatches) {
    totalJsonLd++;
    const content = m.replace(/<script[^>]*>/i, '').replace(/<\/script>/i, '');
    try {
      const obj = JSON.parse(content);
      if (obj['@graph']) {
        obj['@graph'].forEach(item => {
          schemaTypes.set(item['@type'], (schemaTypes.get(item['@type']) || 0) + 1);
        });
      } else if (obj['@type']) {
        schemaTypes.set(obj['@type'], (schemaTypes.get(obj['@type']) || 0) + 1);
      }
    } catch (e) {
      invalidJsonLd++;
      console.log('Invalid JSON-LD in:', currentRoute, e.message);
    }
  }

  // Check internal links
  const hrefMatches = html.matchAll(/href=["']([^"']+)["']/g);
  for (const match of hrefMatches) {
    const href = match[1];
    if (href.startsWith('/') && !href.startsWith('//') && !href.startsWith('/_next') && !href.startsWith('/favicon.ico')) {
      const cleanHref = href.split('?')[0].split('#')[0].replace(/\/$/, '') || '/';
      if (!validRoutes.has(cleanHref)) {
        if (!unresolvedHrefs.has(cleanHref)) {
          unresolvedHrefs.set(cleanHref, []);
        }
        unresolvedHrefs.get(cleanHref).push(currentRoute);
      }
    }
  }
}

console.log('--- DEEP CRAWLER AUDIT SUMMARY ---');
console.log('HTML files inspected:', htmlFiles.length);
console.log('Pages missing H1:', missingH1);
console.log('Pages with multiple H1:', multipleH1);
console.log('Pages missing Canonical:', missingCanonical);
console.log('Pages missing Meta Description:', missingDesc);
console.log('Total JSON-LD schemas parsed:', totalJsonLd);
console.log('Invalid JSON-LD syntax:', invalidJsonLd);
console.log('Titles > 70 chars:', longTitles);
console.log('Titles < 20 chars:', shortTitles);
console.log('Unresolved internal link targets:', unresolvedHrefs.size);
for (const [link, sources] of unresolvedHrefs.entries()) {
  console.log('  Broken Link:', link, 'Found on', sources.length, 'pages. Sample source:', sources[0]);
}
console.log('--- SCHEMA TYPES BREAKDOWN ---');
for (const [type, count] of schemaTypes.entries()) {
  console.log('  @type ' + type + ': ' + count);
}
