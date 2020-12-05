import UrlParser from '../routes/urlparser'
import Routes from '../routes/routes'
import SidebarNavigation from '../utils/sidebar-nav'


class App {
  constructor({content, sidebar}) {
    this._content = content
    this._sidebar = sidebar
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
      this._content.innerHTML = await page.render()
      await SidebarNavigation.highlight(url)
      await page.afterRender()
    } catch (err) {
      this._load404()
    }
  }

  static async refreshPage() {
    const url = UrlParser.parseActiveUrlWithCombiner()
    const page = await Routes[url]
    await page.afterRender()
  }

  _load404() {
    return `
        <article id="main">
            <h2 class="center">Halaman tidak ditemukan</h2>
        </article>
      `
  }
}

export default App