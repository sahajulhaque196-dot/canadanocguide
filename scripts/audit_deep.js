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
let canonicalMismatches = 0;
let missingHreflangEnCa = 0;
let missingHreflangXDefault = 0;
let missingDesc = 0;
let invalidJsonLd = 0;
let totalJsonLd = 0;
let longTitles = 0;
let shortTitles = 0;
let missingOgTitle = 0;
let missingOgImage = 0;
let missingTwitterCard = 0;
let missingImgAlt = 0;
let totalImages = 0;

// Content length analysis
const wordCounts = [];
const thinPages = [];

// Title & Description uniqueness maps
const titlesMap = new Map();
const descsMap = new Map();

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
const schemaTypes = new Map();

for (const f of htmlFiles) {
  if (f.includes('_not-found') || f.includes('_global-error')) continue;

  const html = fs.readFileSync(f, 'utf8');
  let currentRoute = f.replace(appHtmlDir, '').replace(/\\/g, '/').replace('.html', '').replace('/index', '') || '/';

  // 1. Check Title
  const titleMatch = html.match(/<title\b[^>]*>(.*?)<\/title>/i);
  if (titleMatch) {
    const titleText = titleMatch[1];
    if (titleText.length > 70) longTitles++;
    if (titleText.length < 20) shortTitles++;

    if (!titlesMap.has(titleText)) titlesMap.set(titleText, []);
    titlesMap.get(titleText).push(currentRoute);
  }

  // 2. Check H1
  const h1Matches = html.match(/<h1\b[^>]*>(.*?)<\/h1>/gi) || [];
  if (h1Matches.length === 0) {
    missingH1++;
  } else if (h1Matches.length > 1) {
    multipleH1++;
  }

  // 3. Check Canonical
  const canonicalMatch = html.match(/<link\s+rel=["']canonical["']\s+href=["'](.*?)["']/i);
  if (!canonicalMatch) {
    missingCanonical++;
    console.log('Missing Canonical in:', currentRoute);
  } else {
    const expectedCanonical = 'https://canadanocguide.com' + (currentRoute === '/' ? '' : currentRoute);
    if (canonicalMatch[1] !== expectedCanonical) {
      canonicalMismatches++;
      console.log('Canonical mismatch in ' + currentRoute + ': got ' + canonicalMatch[1] + ' expected ' + expectedCanonical);
    }
  }

  // 3.5 Check Hreflang
  const hreflangEnCa = /hreflang=["']en-CA["']/i.test(html);
  if (!hreflangEnCa) missingHreflangEnCa++;
  const hreflangXDefault = /hreflang=["']x-default["']/i.test(html);
  if (!hreflangXDefault) missingHreflangXDefault++;

  // 4. Check Description
  const descMatch = html.match(/<meta\s+name=["']description["']\s+content=["'](.*?)["']/i);
  if (!descMatch) {
    missingDesc++;
    console.log('Missing Description in:', currentRoute);
  } else {
    const descText = descMatch[1];
    if (!descsMap.has(descText)) descsMap.set(descText, []);
    descsMap.get(descText).push(currentRoute);
  }

  // 5. OpenGraph & Twitter
  const ogTitleMatch = html.match(/<meta\s+property=["']og:title["']/i);
  if (!ogTitleMatch) missingOgTitle++;
  const ogImgMatch = html.match(/<meta\s+property=["']og:image["']/i);
  if (!ogImgMatch) missingOgImage++;
  const twitterCardMatch = html.match(/<meta\s+name=["']twitter:card["']/i);
  if (!twitterCardMatch) missingTwitterCard++;

  // 6. Image Alts
  const imgMatches = Array.from(html.matchAll(/<img\b([^>]*?)>/gi));
  for (const img of imgMatches) {
    totalImages++;
    if (!img[1].includes('alt=') || img[1].match(/alt=["']\s*["']/)) {
      missingImgAlt++;
    }
  }

  // 7. Word Count (Strip tags and scripts)
  const bodyText = html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  const words = bodyText.split(/\s+/).filter(w => w.length > 1).length;
  wordCounts.push({ route: currentRoute, words });
  if (words < 300) {
    thinPages.push({ route: currentRoute, words });
  }

  // 8. Check JSON-LD
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

  // 9. Check internal links
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

console.log('\n--- ADVANCED MULTI-AGENT AUDIT METRICS ---');
console.log('Total indexable HTML pages inspected:', wordCounts.length);
console.log('Pages missing H1:', missingH1);
console.log('Pages with multiple H1:', multipleH1);
console.log('Pages missing Canonical:', missingCanonical);
console.log('Canonical URL mismatches:', canonicalMismatches);
console.log('Pages missing hreflang="en-CA":', missingHreflangEnCa);
console.log('Pages missing hreflang="x-default":', missingHreflangXDefault);
console.log('Pages missing Meta Description:', missingDesc);
console.log('Pages missing OpenGraph Title:', missingOgTitle);
console.log('Pages missing OpenGraph Image:', missingOgImage);
console.log('Pages missing Twitter Card:', missingTwitterCard);
console.log('Total Images parsed:', totalImages);
console.log('Images missing alt or empty alt:', missingImgAlt);
console.log('Total JSON-LD schemas parsed:', totalJsonLd);
console.log('Invalid JSON-LD syntax:', invalidJsonLd);
console.log('Titles > 70 chars (SERP truncation risk):', longTitles);
console.log('Titles < 20 chars:', shortTitles);

let dupTitlesCount = 0;
for (const [t, routes] of titlesMap.entries()) {
  if (routes.length > 1) {
    dupTitlesCount++;
    console.log('Duplicate Title across ' + routes.length + ' pages: "' + t + '" (' + routes.join(', ') + ')');
  }
}
console.log('Duplicate Titles detected:', dupTitlesCount);

let dupDescsCount = 0;
for (const [d, routes] of descsMap.entries()) {
  if (routes.length > 1) {
    dupDescsCount++;
    console.log('Duplicate Description across ' + routes.length + ' pages: "' + d.slice(0, 50) + '..." (' + routes.join(', ') + ')');
  }
}
console.log('Duplicate Descriptions detected:', dupDescsCount);

wordCounts.sort((a, b) => a.words - b.words);
const minWords = wordCounts[0];
const maxWords = wordCounts[wordCounts.length - 1];
const avgWords = Math.round(wordCounts.reduce((acc, p) => acc + p.words, 0) / wordCounts.length);
console.log('\n--- CONTENT DEPTH & THIN PAGE AUDIT ---');
console.log('Min word count:', minWords.words, 'on route', minWords.route);
console.log('Max word count:', maxWords.words, 'on route', maxWords.route);
console.log('Average word count across all pages:', avgWords);
console.log('Pages under 300 words (thin content threshold):', thinPages.length);
if (thinPages.length > 0) {
  console.log('Thin pages sample:', thinPages);
}

console.log('\n--- CRAWLABILITY & INTERNAL LINKING AUDIT ---');
console.log('Unresolved internal link targets:', unresolvedHrefs.size);
for (const [link, sources] of unresolvedHrefs.entries()) {
  console.log('  Broken Link:', link, 'Found on', sources.length, 'pages. Sample source:', sources[0]);
}

console.log('\n--- STRUCTURED DATA / SCHEMA GRAPH AUDIT ---');
for (const [type, count] of schemaTypes.entries()) {
  console.log('  @type ' + type + ': ' + count);
}

