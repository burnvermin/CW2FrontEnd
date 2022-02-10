var cacheName = "petstore-v1";
var cacheFiles = [
    'index.html',
    'petstore.webmanifest',
    'images/Maths.png',
    'images/Hunt.jpg',
    'images/Ms.jpg',
    'images/UX.jpg',
    'images/WD.jpg',
    'images/ENG.jpg',
    'images/Py.jpg',
    'images/EE.jpg',
    'images/RS.jpg',
    'images/MS.jpg',
    'images/maf.jpg',
    'images/icon-store-512.png'
];

self.addEventListener('install', (e) => {
    console.log('[Service Worker] Install');
    e.waitUntil(
        caches.open(cacheName).then((cache) => {
            console.log('[Service Worker] Caching all the files');
            return cache.addAll(cacheFiles);
        })
    );
});
self.addEventListener('fetch', function (e) {
    e.respondWith (
        cache.match(e.request).then(function (r) {
            //Download the file if it is not in the cache
            return r || fetch (e.request).then(function (response) {
                //Add the new file to cache
                return caches.open(cacheName).then(function (cache) {
                    cache.put(e.request, response.clone());
                    return response; 
                })
            })
        })
    )
});