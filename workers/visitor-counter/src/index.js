const SITE_ORIGINS = new Set([
  'https://masumkaji.tech',
  'https://www.masumkaji.tech',
]);

function corsHeaders(origin) {
  const headers = new Headers({
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Cache-Control': 'no-store',
    'Vary': 'Origin',
  });

  if (SITE_ORIGINS.has(origin)) headers.set('Access-Control-Allow-Origin', origin);
  return headers;
}

function json(data, status, headers) {
  headers.set('Content-Type', 'application/json; charset=utf-8');
  return new Response(JSON.stringify(data), { status, headers });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const origin = request.headers.get('Origin') ?? '';
    const headers = corsHeaders(origin);

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers });
    }

    if (!SITE_ORIGINS.has(origin)) {
      return json({ error: 'Origin not allowed' }, 403, headers);
    }

    if (url.pathname === '/count' && request.method === 'GET') {
      const row = await env.DB.prepare(
        'SELECT total FROM site_visits WHERE id = 1',
      ).first();
      return json({ total: Number(row?.total ?? 0) }, 200, headers);
    }

    if (url.pathname === '/visit' && request.method === 'POST') {
      await env.DB.prepare(
        'INSERT INTO site_visits (id, total) VALUES (1, 1) ON CONFLICT(id) DO UPDATE SET total = total + 1',
      ).run();
      const row = await env.DB.prepare(
        'SELECT total FROM site_visits WHERE id = 1',
      ).first();
      return json({ total: Number(row?.total ?? 0) }, 200, headers);
    }

    return json({ error: 'Not found' }, 404, headers);
  },
};
