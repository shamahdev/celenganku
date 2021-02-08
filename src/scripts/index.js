import 'regenerator-runtime'
import '../styles/base.css'
import '../styles/components.css'
import '../styles/utilities.css'
import App from './views/app'

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
})

// Needed for Hot Module Replacement
if (module.hot) {
  module.hot.accept() // eslint-disable-line no-undef
}
