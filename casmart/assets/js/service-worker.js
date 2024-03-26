// service-worker.js


const CACHE_NAME = 'my-ecommerce-app-cache-v1';
const urlsToCache = [
    '/',

    'casmart/index.html',
    'casmart/assets/css/style.css',
    'casmart/assets/js/script.js',
    'casmart/assets/js/service-worker.js',
    'casmart/assets/js/manifest.json'


    // Add more files to cache as needed
];


self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache)
                    .catch(function (error) {
                        console.error('Cache.addAll error:', error);
                    });
            })
    );
});


self.addEventListener('activate', function (event) {
    // Perform activation steps
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
