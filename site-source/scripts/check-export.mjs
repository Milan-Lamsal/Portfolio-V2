import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { resolve, join } from 'node:path';
const root = resolve(process.argv[2] || 'out');
const prefix = process.env.NEXT_PUBLIC_BASE_PATH || '';
function walk(dir) { return readdirSync(dir, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)]); }
const pages = walk(root).filter(p => p.endsWith('.html'));
let checked = 0;
for (const page of pages) {
  const html = readFileSync(page, 'utf8');
  for (const match of html.matchAll(/(?:href|src)="(\/[^"]*)"/g)) {
    const url = match[1].replaceAll('&amp;', '&');
    if (url.startsWith('//')) continue;
    assert.ok(url === prefix || url.startsWith(prefix + '/'), `Path escaped base path: ${url}`);
    const pathname = decodeURIComponent(url.split(/[?#]/)[0].slice(prefix.length));
    let file = join(root, pathname);
    if (existsSync(file) && statSync(file).isDirectory()) file = join(file, 'index.html');
    assert.ok(existsSync(file), `Broken exported link in ${page}: ${url}`);
    checked++;
  }
}
assert.ok(pages.length >= 6, 'Expected home, labs, projects, and 404 pages');
console.log(`Verified ${checked} local asset and page links across ${pages.length} exported HTML files at ${prefix || '/'}.`);
