import 'regenerator-runtime'
import '../styles/base.css'
import '../styles/components.css'
import '../styles/utilities.css'
import JWTParser from './helper/jwtparser'

import App from './views/app'

const app = new App({
  content: document.querySelector('main'),
  sidebar: document.createElement('side-bar'),
  appbar: document.querySelector('app-bar'),
})

const retrieveUser = async () => {
  try {
    const response = await fetch('/token')
    let token = await response.json()
    token = await JWTParser(token.response)
    return token
  } catch (error) {
    return {
      error: true,
      message: error,
    }
  }
}

const pageLoader = async () => {
  const userRole = await retrieveUser()
  if (userRole.error) {
    app.loadPage('unauthorized')
  } else if (userRole.role === 'user') {
    app.loadPage('user')
  } else app.loadPage('admin')
}

window.addEventListener('hashchange', pageLoader)

window.addEventListener('load', pageLoader)

// Needed for Hot Module Replacement
if (module.hot) {
  module.hot.accept() // eslint-disable-line no-undef
}
