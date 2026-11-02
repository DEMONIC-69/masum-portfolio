import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';

const root = process.cwd();
const template = await readFile(join(root, 'dist', 'index.html'), 'utf8');
const generatedAt = '2026-11-02';

const pages = [
  {
    path: 'ventures/siftmirth/index.html',
    url: 'https://masumkaji.tech/ventures/siftmirth/',
    title: 'Siftmirth — Personalized Gifting Venture Case Study | Masum Kaji',
    description: 'How Masum Kaji built and sold Siftmirth, a one-person AI-assisted personalized gifting venture. Founder-reported revenue, estimated costs, sale, and lessons.',
    heading: 'Siftmirth venture case study',
    text: 'A one-person, AI-assisted personalized gifting venture. Siftmirth recorded $375 dashboard revenue, about $195 estimated net profit after listed costs, and a founder-reported $1,000 sale price. Figures are founder-provided and not independently audited.',
    type: 'Article',
  },
  {
    path: 'ventures/monee-forum/index.html',
    url: 'https://masumkaji.tech/ventures/monee-forum/',
    title: 'Monee Forum — YouTube Channel Case Study | Masum Kaji',
    description: 'The documented story of Monee Forum, Masum Kaji’s online income and business education YouTube channel, grown to more than 225,000 subscribers and sold.',
    heading: 'Monee Forum venture case study',
    text: 'Monee Forum was a YouTube channel focused on online money, online business, and business education. Masum Kaji grew it to more than 225,000 subscribers and later sold the channel.',
    type: 'Article',
  },
  {
    path: 'market-notes/btcusd-sfx-go/index.html',
    url: 'https://masumkaji.tech/market-notes/btcusd-sfx-go/',
    title: 'BTCUSD Long — SFX-GO Trade Note | Masum Kaji',
    description: 'A dated personal BTCUSD position log: SFX Funded $10,000 SFX-GO account, entry 78,020, target 81,034, and stop 76,130. Not a trade recommendation.',
    heading: 'BTCUSD long trade note',
    text: 'Personal position log dated November 1, 2026. The reported BTCUSD long listed entry 78,020, take profit 81,034, and stop loss 76,130 on an SFX Funded $10,000 SFX-GO account. No written rationale, timeframe, or outcome was supplied.',
    type: 'Article',
  },
];

for (const page of pages) {
  const schema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': page.type,
    headline: page.title,
    description: page.description,
    url: page.url,
    datePublished: generatedAt,
    dateModified: generatedAt,
    author: { '@type': 'Person', name: 'Kaji Masum Hossen', alternateName: 'Masum Kaji', url: 'https://masumkaji.tech/' },
    publisher: { '@type': 'Person', name: 'Kaji Masum Hossen', url: 'https://masumkaji.tech/' },
    isPartOf: { '@type': 'WebSite', name: 'Masum Kaji', url: 'https://masumkaji.tech/' },
  });
  let html = template
    .replace('<head>', '<head>\n    <base href="/" />')
    .replace(/<title>.*?<\/title>/, `<title>${page.title}</title>`)
    .replace(/<meta name="description" content="[^"]*"\s*\/>/, `<meta name="description" content="${page.description}" />`)
    .replace(/<link rel="canonical" href="[^"]*"\s*\/>/, `<link rel="canonical" href="${page.url}" />`)
    .replace(/<meta property="og:url" content="[^"]*"\s*\/>/, `<meta property="og:url" content="${page.url}" />`)
    .replace(/<meta property="og:title" content="[^"]*"\s*\/>/, `<meta property="og:title" content="${page.title}" />`)
    .replace(/<meta property="og:description" content="[^"]*"\s*\/>/, `<meta property="og:description" content="${page.description}" />`)
    .replace(/<meta name="twitter:card" content="[^"]*"\s*\/>/, '<meta name="twitter:card" content="summary_large_image" />')
    .replace(/\{"@context":"https:\/\/schema\.org"[\s\S]*?<\/script>/, `${schema}\n    </script>`)
    .replace(/<div id="root"><\/div>/, `<div id="root"></div><noscript><main><h1>${page.heading}</h1><p>${page.text}</p><p><a href="/">Return to Masum Kaji’s portfolio</a></p></main></noscript>`)
    .replace(/<noscript><main><h1>Masum Kaji<\/h1>[\s\S]*?<\/noscript>/, '');

  const output = join(root, 'dist', page.path);
  await mkdir(dirname(output), { recursive: true });
  await writeFile(output, html);
}

console.log(`Generated ${pages.length} SEO-ready detail pages.`);
