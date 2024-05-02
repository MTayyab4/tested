const cacheName = 'lego-star-wars-gallery-v2';
const urlsToCache = [
  '/',
  'index.html',
  'style.css',
  'app.js',
  // Add more URLs to cache here if needed
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== cacheName) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});



self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
