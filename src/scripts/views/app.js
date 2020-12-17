import UrlParser from '../routes/urlparser'
import Routes from '../routes/routes'
import SidebarNavigation from '../utils/sidebar-nav'


class App {
  constructor({content, sidebar, appbar}) {
    this._content = content
    this._sidebar = sidebar
    this._appbar = appbar
    this._initialAppShell()
  }

  _initialAppShell() {
    SidebarNavigation.init({
      sidebar: this._sidebar
    })
  }

  async loadPage() {
    const url = UrlParser.parseActiveUrlWithCombiner()
    const page = await Routes[url]
    try {
      if(url === '/') {
        this._toggleNavigation(false)
      } else{
        this._toggleNavigation(true)
      }
      this._content.innerHTML = await page.render()
      await SidebarNavigation.highlight(url)
      await page.afterRender()
    } catch (err) {
      this._load404()
    }
  }

  _toggleNavigation(state = true, mode = 'user') {
    if(state) {
      this._sidebar.classList.remove('hidden')
      this._appbar.classList.remove('hidden')
      if(mode === 'admin') {
        this._sidebar.classList.add('admin-style')
        this._appbar.classList.add('admin-style')
      } else {
        this._sidebar.classList.remove('admin-style')
        this._appbar.classList.remove('admin-style')
      }
    } else {
      this._sidebar.classList.add('hidden')
      this._appbar.classList.add('hidden')
    }
  }

  static async refreshPage() {
    const url = UrlParser.parseActiveUrlWithCombiner()
    const page = await Routes[url]
    await page.afterRender()
  }

  _load404() {
    return `
        <article id='main'>
            <h2 class='center'>Halaman tidak ditemukan</h2>
        </article>
      `
  }
}

export default App