import UrlParser from '../routes/urlparser'
import Routes from '../routes/routes'
import SidebarNavigation from '../utils/sidebar-init'
import Appbar from '../utils/appbar-init'

// Components
import '../components/sidebar'
import '../components/appbar'

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
    Appbar.init({
      appbar: this._appbar,
    })
  }

  async loadPage(role) {
    let url = UrlParser.parseActiveUrlWithCombiner()
    if (url === '') url = '/'

    try {
      let page
      switch (role) {
        case 'user':
          page = await Routes.user[url]
          SidebarNavigation.setState(true, role)
          Appbar.setState(true, role)
          break
        case 'admin':
          page = await Routes.admin[url]
          SidebarNavigation.setState(true, role)
          Appbar.setState(true, role)
          break
        default:
          page = await Routes.login
          SidebarNavigation.setState(false)
          Appbar.setState(false)
          break
      }

      document.body.prepend(this._sidebar)
      this._content.innerHTML = await page.render()
      await SidebarNavigation.highlight(url)
      await page.afterRender()
    } catch (err) {
      console.log(err)
      this._content.innerHTML = this.constructor._loadPageNotFound()
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

  static async refreshPage(role) {
    const url = UrlParser.parseActiveUrlWithCombiner()
    const page = await Routes[url]
    await page.afterRender()
  }

  static _loadPageNotFound() {
    return `
        <article id='main'>
            <h2 class='center'>Halaman tidak ditemukan</h2>
        </article>
      `
  }
}

export default App
