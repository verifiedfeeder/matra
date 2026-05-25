const CACHE_NAME = 'matra-v1.2.0';

// Assets that must be cached on install
const PRECACHE_ASSETS = [
  './',
  './index.html',
  './drugs.json',
  './manifest.json',
  './icons/matra.ico',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=JetBrains+Mono:wght@400;700&display=swap'
];

// ── Install: precache everything ──────────────────────────────────
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // addAll fails if any single asset fails — use individual puts to be resilient
      return Promise.allSettled(
        PRECACHE_ASSETS.map(url =>
          fetch(url).then(res => {
            if (res.ok) return cache.put(url, res);
          }).catch(() => {/* font CDN may fail offline at first install — OK */})
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
  const url = new URL(event.request.url);

  // drugs.json → Cache First, background revalidate (stale-while-revalidate)
  if (url.pathname.endsWith('drugs.json')) {
    event.respondWith(staleWhileRevalidate(event.request));
    return;
  }

  // Static assets (HTML, icons, manifest, fonts) → Cache First
  if (
    event.request.destination === 'document' ||
    event.request.destination === 'font'     ||
    event.request.destination === 'image'    ||
    url.pathname.endsWith('.json')            ||
    url.pathname.endsWith('.html')            ||
    url.pathname.endsWith('.css')             ||
    url.pathname.endsWith('.js')              ||
    url.pathname.endsWith('.ico')
  ) {
    event.respondWith(cacheFirst(event.request));
    return;
  }

  // Everything else → Network First with cache fallback
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

  // Kick off a background fetch to refresh the cache
  const fetchPromise = fetch(request).then(response => {
    if (response.ok) cache.put(request, response.clone());
    return response;
  }).catch(() => null);

  // Return cached immediately if available, else wait for network
  return cached || fetchPromise;
}
