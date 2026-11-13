// Keeps the app working offline: serve from cache straight away, refresh the cache in the background.
const CACHE = 'scribble-v19';
const SHELL = [
  '/', '/index.html', '/style.css', '/recap.js', '/draw.js', '/sync.js', '/app.js', '/manifest.webmanifest',
  '/icons/icon-192.png', '/icons/icon-512.png', '/icons/apple-touch-icon.png',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const fonts = url.host === 'fonts.googleapis.com' || url.host === 'fonts.gstatic.com';
  if (url.origin !== location.origin && !fonts) return;

  e.respondWith(caches.open(CACHE).then(async cache => {
    // opening the app at any address gets the app; other pages (privacy, terms) are themselves
    const page = req.mode === 'navigate' && !/\.html$/.test(url.pathname);
    const key = page || url.pathname === '/index.html' ? '/' : req;
    const hit = await cache.match(key, { ignoreSearch: true });
    const fresh = fetch(req)
      .then(res => {
        if (res.ok || res.type === 'opaque') cache.put(key, res.clone());
        return res;
      })
      .catch(() => hit);
    return hit || fresh;
  }));
});
