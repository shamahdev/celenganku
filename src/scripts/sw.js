/* eslint-disable no-restricted-globals */
import 'regenerator-runtime'
import { setCacheNameDetails, skipWaiting, clientsClaim } from 'workbox-core'
import { precacheAndRoute } from 'workbox-precaching'
import { registerRoute } from 'workbox-routing'
import { CacheFirst, NetworkFirst, StaleWhileRevalidate } from 'workbox-strategies'
import { CacheableResponsePlugin } from 'workbox-cacheable-response'
import { ExpirationPlugin } from 'workbox-expiration'

skipWaiting()
clientsClaim()

setCacheNameDetails({
  prefix: 'celenganku',
  suffix: 'v1',
  precache: 'app-shell',
})
precacheAndRoute(self.__WB_MANIFEST, {
  ignoreUrlParametersMatching: [/.*/],
})

registerRoute(
  ({ url }) => url.origin,
  new NetworkFirst({
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  }),
)

registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'images',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      }),
    ],
  }),
)

registerRoute(
  ({ url }) => url.origin === 'https://fonts.googleapis.com',
  new StaleWhileRevalidate({
    cacheName: 'google-fonts-stylesheets',
  }),
)

registerRoute(
  ({ url }) => url.origin === 'https://fonts.gstatic.com',
  new CacheFirst({
    cacheName: 'google-fonts-webfonts',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30,
      }),
    ],
  }),
)

self.addEventListener('push', (event) => {
  const title = 'Celenganku Notification'
  const options = {
    body: event.data.text(),
  }
  event.waitUntil(self.registration.showNotification(title, options))
})
