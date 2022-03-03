var cacheName = "Lessons";
var cacheFiles = [
    'index.html',
    'script/app.js',
    'css/style.css',
    'lessons.webmanifest',
    'images//Maths.png',
    'images//Hunt.jpg',
    'images//Ms.png',
    'images//UX.jpeg',
    'images//WD.png',
    'images//ENG.jpg',
    'images//Py.jpg',
    'images//EE.png',
    'images//RS.jpg',
    'images//MS.png',
    'images//maf.jpg',  
    'images//icon-store-512.png',
    'images//icon-store-32.png'
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