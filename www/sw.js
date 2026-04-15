// Auto version using timestamp
const CACHE_NAME = "ubuntu-ehr-" + new Date().getTime();

const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./dark.html",
  "./logo_bg.jpg",
  "./IMG-20251003-WA0016.jpg",
  "./IMG-20251229-WA0003.jpg",
  "./manifest.json",
  "./sw.js"
];

// Install: cache files
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log("Caching new version:", CACHE_NAME);
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activate: remove old caches
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if(key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );
  self.clients.claim();
});

// Fetch: respond with cache first
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      return cachedResponse || fetch(event.request);
    })
  );
});
