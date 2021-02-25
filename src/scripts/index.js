import 'regenerator-runtime'
import 'animate.css/source/_base.css'
import 'animate.css/source/bouncing_entrances/bounceIn.css'
import 'animate.css/source/zooming_entrances/zoomIn.css'
import 'animate.css/source/zooming_exits/zoomOut.css'
import '../styles/base.css'
import '../styles/components.css'
import '../styles/utilities.css'
import App from './views/app'
import ServiceWorkerRegister from './utils/swregister'

const app = new App({
  content: document.querySelector('main'),
  sidebar: document.createElement('side-bar'),
  appbar: document.querySelector('app-bar'),
})

window.addEventListener('hashchange', () => {
  app.loadPage()
})
window.addEventListener('load', () => {
  app.loadPage()
  ServiceWorkerRegister()
})

// Needed for Hot Module Replacement
if (module.hot) {
  module.hot.accept() // eslint-disable-line no-undef
}
