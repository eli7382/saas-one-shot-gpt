self.addEventListener("install", (e) => { e.waitUntil(caches.open("tbp-v1").then(c => c.addAll(["/","/pricing","/icons/icon-192.png"]))); });
self.addEventListener("fetch", (e) => {
  e.respondWith((async () => {
    const cached = await caches.match(e.request);
    if (cached) { fetch(e.request).then(r=>caches.open("tbp-v1").then(c=>c.put(e.request, r.clone()))); return cached; }
    const res = await fetch(e.request).catch(()=>undefined);
    if (res) { const c = await caches.open("tbp-v1"); c.put(e.request, res.clone()); return res; }
    return new Response("Offline", { status: 503 });
  })());
}); 