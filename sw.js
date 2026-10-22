
const C='kneelbooks-v4-android-fix';
self.addEventListener('install',e=>{
  self.skipWaiting();
  console.log("[SW] install v4");
});
self.addEventListener('activate',e=>{
  e.waitUntil(
    caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==C).map(k=>{console.log("[SW] deleting old",k); return caches.delete(k);}))).then(()=>self.clients.claim())
  );
});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET') return;
  const url=new URL(e.request.url);
  if(url.origin!==location.origin) return;
  // For navigation / index.html, always network first to get latest popup
  if(e.request.mode==='navigate' || url.pathname.endsWith('/') || url.pathname.endsWith('index.html')){
    e.respondWith(
      fetch(e.request).then(r=>{
        const clone=r.clone();
        caches.open(C).then(c=>c.put(e.request,clone));
        return r;
      }).catch(()=>caches.match(e.request).then(m=>m||caches.match('./')))
    );
    return;
  }
  // For other same-origin assets, cache-first
  e.respondWith(
    caches.match(e.request).then(cached=>{
      if(cached) return cached;
      return fetch(e.request).then(r=>{
        const clone=r.clone();
        caches.open(C).then(c=>c.put(e.request,clone));
        return r;
      });
    })
  );
});
// OneSignal
try{importScripts("https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.sw.js");}catch(e){console.log("[SW] OneSignal import failed",e);}
self.addEventListener('notificationclick',e=>{
  if(e.notification.tag!=='kb-remind') return;
  e.notification.close();
  e.waitUntil(clients.matchAll({type:'window',includeUncontrolled:true}).then(l=>{for(const c of l){if('focus' in c)return c.focus()}return clients.openWindow('./')}));
});
