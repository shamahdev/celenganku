import UrlParser from '../routes/urlparser'
import Routes from '../routes/routes'
import SidebarNavigation from '../utils/sidebar-nav-init'

// Components
import '../components/sidebar-nav'

class App {
  constructor({ content, sidebar, appbar }) {
    this._content = content
    this._sidebar = sidebar
    this._appbar = appbar
    this._initialAppShell()
  }

  _initialAppShell() {
    SidebarNavigation.init({
      sidebar: this._sidebar,
    })
  }

  async loadPage() {
    const url = UrlParser.parseActiveUrlWithCombiner()
    const page = await Routes[url]
    try {
      if (url === '/') {
        this._toggleNavigation(false)
      } else {
        this._toggleNavigation(true)
        if (url.includes('admin')) {
          this._toggleNavigation(true, 'admin')
          this._sidebar.type = 'admin'
        } else {
          this._sidebar.type = 'user'
        }
        document.body.prepend(this._sidebar)
      }
      this._content.innerHTML = await page.render()
      // eslint-disable-next-line no-restricted-globals
      history.replaceState(null, null, document.location.pathname)
      await SidebarNavigation.highlight(url)
      await page.afterRender()
    } catch (err) {
      console.log(url)
      console.error(err)
      this._content.innerHTML = this.constructor._load404()
    }
  }

  _toggleNavigation(state = true, mode = 'user') {
    if (state) {
      this._appbar.classList.remove('hidden')
      this._sidebar.classList.remove('hidden')
      if (mode === 'admin') {
        this._appbar.classList.add('md:bg-blue-500')
        this._appbar.classList.remove('md:bg-primary')
      } else {
        this._appbar.classList.remove('md:bg-blue-500')
        this._appbar.classList.add('md:bg-primary')
      }
    } else {
      this._appbar.classList.add('hidden')
      this._sidebar.classList.add('hidden')
    }
  }

  static async refreshPage() {
    const url = UrlParser.parseActiveUrlWithCombiner()
    const page = await Routes[url]
    await page.afterRender()
  }

  static _load404() {
    return `
        <article id='main'>
            <h2 class='center'>Halaman tidak ditemukan</h2>
        </article>
      `
  }
}

export default App
