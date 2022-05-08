//list files that should be accessible offline
const FILES_TO_CACHE = [
    "./index.html",
    "./assets/t11styles.css",
    "./assets/t11script.js",
    "./assets/8clock11.png",
    "./assets/3clock11.png",
    "./assets/icon-512x512.png"
];

//name the service worker
const APP_PREFIX = 'eleven';
const VERSION = 'version_01';
const CACHE_NAME = APP_PREFIX + VERSION;

//look for existing caches by key, add self to active caches, delete unneccesary caches
self.addEventListener('activate', function(e) {
    e.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            console.log('installing cache: ' + CACHE_NAME)
            return cache.addAll(FILES_TO_CACHE)
        })
    )
});

//look for existing caches by key, add self to active caches, delete unneccesary caches
self.addEventListener('activate', function(e) {
    e.waitUntil(
        caches.keys().then(function(keyList) {
            let cacheKeepList = keyList.filter(function(key) {
                return key.indexOf(APP_PREFIX);
            })
            cacheKeepList.push(CACHE_NAME);
            return Promise.all(keyList.map(function(key, i) {
                if (cacheKeepList.indexOf(key) === -1) {
                    console.log('deleting cache: ' + keyList[i]);
                    return caches.delete(keyList[i]);
                }
            }));
        })
    )
});