var V="aikatsu-v3";var FILES=["./","index.html","gate.js","db.js","config.js","manifest.webmanifest","icon-192.png"];
self.addEventListener("install",function(e){e.waitUntil(caches.open(V).then(function(c){return c.addAll(FILES)}));self.skipWaiting()});
self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!==V}).map(function(x){return caches.delete(x)}))}));self.clients.claim()});
self.addEventListener("fetch",function(e){if(e.request.method!=="GET"||new URL(e.request.url).origin!==location.origin)return;
var net=/config\.js|gate\.js|db\.js/.test(e.request.url);
e.respondWith(caches.open(V).then(function(c){return c.match(e.request).then(function(h){
 var f=fetch(e.request).then(function(r){if(r.ok)c.put(e.request,r.clone());return r}).catch(function(){return h});
 return net?f.then(function(r){return r||h}):(h||f)})}))});
