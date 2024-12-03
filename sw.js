const CACHE_NAME = 'pwa-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/about.html',
  '/offline.html',
];

// Install Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Activate Service Worker
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request).catch(() => caches.match('/offline.html'));
    })
  );
});

// Push Notification
self.addEventListener('push', event => {
  const data = event.data ? event.data.text() : 'Default notification message!';
  const options = {
    body: data,
    icon: '/images/icons/icon-192x192.png',
    badge: '/images/icons/icon-192x192.png'
  };
  event.waitUntil(
    self.registration.showNotification('PWA Notification', options)
  );
});
