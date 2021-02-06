import 'regenerator-runtime'
import '../styles/base.css'
import '../styles/components.css'
import '../styles/utilities.css'

import App from './views/app'

const app = new App({
  content: document.querySelector('main'),
  sidebar: document.createElement('sidebar-nav'),
  appbar: document.getElementById('appbar'),
})

// window.addEventListener('popstate', () => {
//   console.log(window.location.pathname)
//   app.loadUserPage()
// })

if (window.location.pathname === '/admin') {
  console.log('admin euy')
}

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
