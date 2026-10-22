
const C='kneelbooks-v3-always-popup';
self.addEventListener('install',e=>{self.skipWaiting(); console.log("[SW] install v3");});
self.addEventListener('activate',e=>{
  e.waitUntil(
    caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==C).map(k=>{console.log("[SW] deleting",k); return caches.delete(k);}))).then(()=>clients.claim())
  );
});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET'||new URL(e.request.url).origin!==location.origin) return;
  // For index.html, always go network first to get new popup
  if(e.request.url.includes('index.html') || e.request.mode==='navigate'){
    e.respondWith(fetch(e.request).then(r=>{const c=r.clone(); caches.open(C).then(x=>x.put(e.request,c)); return r;}).catch(()=>caches.match(e.request)));
    return;
  }
  e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(C).then(x=>x.put(e.request,c));return r}).catch(()=>caches.match(e.request)));
});
importScripts("https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.sw.js");
