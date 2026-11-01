import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

const INPUT = 'src/assets/masum-portrait.png';
const OUT = 'public/assets';
mkdirSync(OUT, { recursive: true });

const portrait = await sharp(INPUT).ensureAlpha().png().toBuffer();

for (const outputWidth of [1100, 720, 420]) {
  await sharp(portrait)
    .resize({ width: outputWidth })
    .webp({ quality: 86, alphaQuality: 90 })
    .toFile(OUT + '/portrait-' + outputWidth + '.webp');
}

const socialPortrait = await sharp(portrait).resize({ height: 600 }).png().toBuffer();
const glow = Buffer.from('<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="g" cx="78%" cy="45%" r="45%"><stop offset="0" stop-color="#a88439" stop-opacity="0.45"/><stop offset="1" stop-color="#a88439" stop-opacity="0"/></radialGradient></defs><rect width="1200" height="630" fill="url(#g)"/></svg>');
const text = Buffer.from('<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg"><text x="72" y="300" font-family="Impact, Arial, sans-serif" font-size="112" fill="#f4f1ec" letter-spacing="4">MASUM KAJI</text><text x="78" y="352" font-family="Helvetica, Arial, sans-serif" font-weight="700" font-size="13" fill="#d9b46a" letter-spacing="1.5">RESEARCH ANALYST • BUSINESS STRATEGIST • FINANCE SPECIALIST</text></svg>');

await sharp({ create: { width: 1200, height: 630, channels: 4, background: '#090a0c' } })
  .composite([
    { input: glow },
    { input: socialPortrait, gravity: 'southeast' },
    { input: text },
  ])
  .jpeg({ quality: 85 })
  .toFile(OUT + '/og-image.jpg');

console.log('Responsive portrait and social card generated.');
