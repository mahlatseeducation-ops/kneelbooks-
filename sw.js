// KneelBooks service worker
// Bump this version any time you upload new files so every device drops old caches.
const VERSION = "kb-2026-10-23-fix2";
const CACHE = "kneelbooks-" + VERSION;

// Keep push notifications (OneSignal) working.
try {
  importScripts("https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.sw.js");
} catch (e) {}

self.addEventListener("install", () => {
  // Activate this version immediately instead of waiting for old tabs to close.
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      // Delete every older cache, including the one that served the blank page.
      const keys = await caches.keys();
      await Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)));
      await self.clients.claim();
      // Reload every open KneelBooks window/app so people leave the blank page
      // and load the fixed version straight away.
      const wins = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
      wins.forEach((w) => { try { w.navigate(w.url); } catch (e) {} });
    })()
  );
});

// Network first: always try the live file, fall back to the cache only when offline.
self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    (async () => {
      try {
        const fresh = await fetch(req, { cache: "no-cache" });
        if (fresh && fresh.ok) {
          const copy = fresh.clone();
          caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
        }
        return fresh;
      } catch (err) {
        const cached = await caches.match(req);
        if (cached) return cached;
        if (req.mode === "navigate") {
          const home = await caches.match(self.registration.scope);
          if (home) return home;
        }
        throw err;
      }
    })()
  );
});
