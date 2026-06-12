#!/usr/bin/env node
// docs/ 配下の HTML のローカル参照（href / src）を検査する。
// 外部URL（http/https/protocol-relative）・mailto:・tel:・#・data: は対象外。
// リンク切れがあれば一覧表示して exit 1、問題なければ exit 0。
// 外部ライブラリ不要（Node 18+ の標準モジュールのみ）。

import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..', 'docs');

function htmlFiles(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...htmlFiles(p));
    else if (name.toLowerCase().endsWith('.html')) out.push(p);
  }
  return out;
}

const ATTR_RE = /\b(?:href|src)\s*=\s*"([^"]+)"/gi;
const SKIP_RE = /^(?:https?:)?\/\/|^mailto:|^tel:|^#|^data:|^javascript:/i;

const broken = [];
let checked = 0;

for (const file of htmlFiles(root)) {
  const html = readFileSync(file, 'utf8');
  for (const m of html.matchAll(ATTR_RE)) {
    const raw = m[1];
    if (SKIP_RE.test(raw)) continue;
    const target = raw.split('#')[0].split('?')[0];
    if (!target) continue; // 純粋なフラグメント等
    const abs = target.startsWith('/')
      ? join(root, target) // ルート相対は docs/ 起点とみなす
      : resolve(dirname(file), target);
    checked++;
    if (!existsSync(abs)) {
      broken.push({ file: file.slice(root.length + 1).replace(/\\/g, '/'), link: raw });
    }
  }
}

if (broken.length > 0) {
  console.error(`NG: ${broken.length} broken local link(s) / ${checked} checked`);
  for (const b of broken) console.error(`  ${b.file} -> ${b.link}`);
  process.exit(1);
}
console.log(`OK: ${checked} local link(s) checked, no broken links`);
