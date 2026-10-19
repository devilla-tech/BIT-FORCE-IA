const CACHE = "bitforce-ai-v1";

const archivos = [
    "./",
    "./index.html",
    "./css/style.css",
    "./js/app.js",
    "./manifest.json"
];


self.addEventListener("install", event => {

    event.waitUntil(
        caches.open(CACHE)
            .then(cache => cache.addAll(archivos))
    );

});


self.addEventListener("fetch", event => {

    event.respondWith(

        caches.match(event.request)
            .then(respuesta => {

                return respuesta || fetch(event.request);

            })

    );

});