import UrlParser from '../routes/urlparser'
import Routes from '../routes/routes'


class App {
  constructor({content}) {

    this._content = content
    this._initialAppShell()
  }

  _initialAppShell() {
    // NavigationDrawer.init({
    //   hamburger: this._hamburger,
    //   drawer: this._drawer,
    //   content: this._content,
    // })
  }

  async loadPage() {
    const url = UrlParser.parseActiveUrlWithCombiner()
    const page = await Routes[url]
    try {
      this._content.innerHTML = await page.render()
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
