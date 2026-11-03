var V="aikatsu-v12";var FILES=["./","index.html","gate.js","db.js","app.js","config.js","manifest.webmanifest","icon-192.png"];
self.addEventListener("install",function(e){e.waitUntil(caches.open(V).then(function(c){return Promise.all(FILES.map(function(f){return fetch(new Request(f,{cache:"reload"})).then(function(r){if(r.ok)return c.put(f,r)}).catch(function(){})}))}));self.skipWaiting()});
self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!==V}).map(function(x){return caches.delete(x)}))}));self.clients.claim()});
// 通信できるときは常に最新を確認(変更がなければ再ダウンロードなし)。オフラインのときだけ保存済みを使う。
self.addEventListener("fetch",function(e){if(e.request.method!=="GET"||new URL(e.request.url).origin!==location.origin)return;
e.respondWith(fetch(e.request.url,{cache:"no-cache"}).then(function(r){if(r.ok){var cp=r.clone();caches.open(V).then(function(c){c.put(e.request,cp)})}return r}).catch(function(){return caches.match(e.request)}))});
