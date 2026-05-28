const CACHE_NAME = 'matra-v1.4.2';
const OFFLINE_URL = './offline.html';

const PRECACHE_ASSETS = [
  './',
  './index.html',
  './offline.html',
  './drugs.json',
  './manifest.json',
  './icons/matra-192.png',
  './icons/matra-512.png',
  './screenshots/screenshot-mobile.png',
  './screenshots/screenshot-desktop.png',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=JetBrains+Mono:wght@400;700&display=swap'
];

// ── Install: precache everything ──────────────────────────────────
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return Promise.allSettled(
        PRECACHE_ASSETS.map(url =>
          fetch(url).then(res => {
            if (res.ok) return cache.put(url, res);
          }).catch(() => {})
        )
      );
    })
  );
});

// ── Activate: clear old caches ────────────────────────────────────
self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      self.clients.claim(),
      caches.keys().then((keys) =>
        Promise.all(
          keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
        )
      )
    ])
  );
});

// ── Fetch: strategy depends on request type ───────────────────────
self.addEventListener('fetch', (event) => {
  // Skip non-GET and chrome-extension requests
  if (event.request.method !== 'GET') return;
  if (event.request.url.startsWith('chrome-extension://')) return;

  const url = new URL(event.request.url);

  // drugs.json → stale-while-revalidate (serve cached, update in background)
  if (url.pathname.endsWith('drugs.json')) {
    event.respondWith(staleWhileRevalidate(event.request));
    return;
  }

  // Navigation requests (HTML pages) → network first, offline fallback
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() =>
        caches.match(OFFLINE_URL) ||
        caches.match('./index.html') ||
        new Response('Offline', { status: 503 })
      )
    );
    return;
  }

  // Static assets → Cache First
  if (
    event.request.destination === 'font'  ||
    event.request.destination === 'image' ||
    url.pathname.endsWith('.json')  ||
    url.pathname.endsWith('.html')  ||
    url.pathname.endsWith('.css')   ||
    url.pathname.endsWith('.js')    ||
    url.pathname.endsWith('.png')   ||
    url.pathname.endsWith('.ico')   ||
    url.pathname.endsWith('.webp')
  ) {
    event.respondWith(cacheFirst(event.request));
    return;
  }

  // Everything else → Network First
  event.respondWith(networkFirst(event.request));
});

// ── Strategies ────────────────────────────────────────────────────

async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    return new Response('Offline and not cached.', { status: 503 });
  }
}

async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cached = await caches.match(request);
    return cached || new Response('Offline.', { status: 503 });
  }
}

async function staleWhileRevalidate(request) {
  const cache  = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);
  const fetchPromise = fetch(request).then(response => {
    if (response.ok) cache.put(request, response.clone());
    return response;
  }).catch(() => null);
  return cached || fetchPromise;
}
