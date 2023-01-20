if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('assets/js/sw.js').then(function(registration) {
    console.log('Service worker registration successful:', registration.scope);
  }).catch(function(error) {
    console.log('Service worker registration failed:', error);
  });
}


self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('mypwa-static-v1').then(function(cache) {
      return cache.addAll([
        '/',
        '/index.html',
        'assets/css/style.css',
        'assets/js/main.js'
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});
