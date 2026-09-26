import { mkdir, copyFile, cp, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const output = path.join(root, 'dist');
await mkdir(output, { recursive: true });
// Site pages use lowercase hyphenated names; drafts such as "index - Copy.html" are left out.
const pages = (await readdir(root)).filter(file => /^[a-z-]+\.html$/.test(file));
for (const file of [...pages, 'styles.css', 'app.js']) {
  await copyFile(path.join(root, file), path.join(output, file));
}
await cp(path.join(root, 'assets'), path.join(output, 'assets'), { recursive: true });
console.log(`Production website built in dist/ (${pages.length} pages). No runtime dependencies required.`);
