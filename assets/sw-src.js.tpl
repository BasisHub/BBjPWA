/*!
 * Built by BBj PWA 
 */
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js');

workbox.setConfig({ debug: false });
workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);
workbox.recipes.googleFontsCache()
workbox.recipes.staticResourceCache()
workbox.recipes.imageCache()

workbox.routing.registerRoute(new workbox.routing.Route(({ request }) => {
  return request.mode === 'navigate' || request.url.includes('webapprmi');
}, new workbox.strategies.NetworkOnly({
  plugins: [
    new workbox.precaching.PrecacheFallbackPlugin({
      fallbackURL: '/<%= programName %>/offline.html'
    })
  ]
})));

self.addEventListener('install', () => {
  self.skipWaiting();
});

// self.addEventListener("message", (event) => {
//   if (event.data && event.data.type === "SKIP_WAITING") {
//     self.skipWaiting();
//   }
// });