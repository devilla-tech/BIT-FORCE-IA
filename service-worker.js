const CACHE = "bit-force-ai-v1";

const ARCHIVOS = [
    "./",
    "./index.html",
    "./style.css",
    "./manifest.json"
];

self.addEventListener("install", (event) => {

    event.waitUntil(
        caches.open(CACHE)
            .then((cache) => {
                return cache.addAll(ARCHIVOS);
            })
    );

});


self.addEventListener("activate", (event) => {

    event.waitUntil(
        caches.keys().then((keys) => {

            return Promise.all(

                keys
                    .filter((key) => key !== CACHE)
                    .map((key) => caches.delete(key))

            );

        })
    );

});


self.addEventListener("fetch", (event) => {

    event.respondWith(

        caches.match(event.request)
            .then((respuesta) => {

                return respuesta ||
                    fetch(event.request);

            })

    );

});
