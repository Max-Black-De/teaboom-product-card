// Собирает статическую версию для GitHub Pages: копирует готовые файлы в dist/.
// CSS к этому моменту уже скомпилирован шагом build:css.
import { cpSync, rmSync, mkdirSync } from 'node:fs';

const OUT = 'dist';
const FILES = ['index.html', 'css', 'js', 'img'];

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT);
for (const file of FILES) cpSync(file, `${OUT}/${file}`, { recursive: true });
console.log(`Статическая версия собрана в ${OUT}/`);
