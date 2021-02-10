/* eslint-disable default-case */
import UrlParser from '../routes/urlparser'
import Routes from '../routes/routes'
import Sidebar from '../utils/sidebar-init'
import Appbar from '../utils/appbar-init'
import APIData from '../data/api-data'

// Components
import '../components/sidebar'
import '../components/appbar'

class App {
  constructor({ content, sidebar, appbar }) {
    this._content = content
    this._sidebar = sidebar
    this._appbar = appbar
    this._user = null
    this._initialAppShell()
  }

  _initialAppShell() {
    Sidebar.init({
      sidebar: this._sidebar,
    })
    Appbar.init({
      appbar: this._appbar,
    })
  }

  async loadPage() {
    this._content.innerHTML = this.constructor._loadPreloader()
    this._user = await APIData.retrieveUser()
    const { id, role } = this._user

    let url = UrlParser.parseActiveUrlWithCombiner()
    if (url === '') url = '/'

    try {
      let page
      if (role !== 'unauthorized') {
        switch (role) {
          case 'user':
            page = await Routes.user[url]
            break
          case 'admin':
            page = await Routes.admin[url]
            break
        }
        Sidebar.setState(true, role)
        Appbar.setState(true, role)

        const userInformation = await this.constructor.getUserInformation(id, role)
        Appbar.setHeader(userInformation.nama, userInformation.url_foto)
      } else {
        page = await Routes.login
        Sidebar.setState(false)
        Appbar.setState(false)
      }

      document.body.prepend(this._sidebar)
      this._content.innerHTML = await page.render()
      Sidebar.highlight(url)
      page.afterRender()
    } catch (err) {
      console.log(err)
      this._content.innerHTML = this.constructor._loadPageNotFound()
    }
  }

  static async getUserInformation(id, role) {
    const userDataArray = []
    switch (role) {
      case 'user':
        userDataArray.push(await APIData.getDataSiswa(id))
        userDataArray.push(await APIData.getProfilSiswa(id))
        break
      case 'admin':
        userDataArray.push(await APIData.getAdmin(id))
        break
    }
    const userInformation = {}
    userDataArray.forEach((data) => {
      Object.assign(userInformation, data)
    })

    return userInformation
  }

  static _loadPageNotFound() {
    return `
    <div id='preloader' class="flex mt-auto mb-auto ml-auto mr-auto">
    <div class="loader ease-linear rounded-full border-8 border-t-8 border-gray-200"></div>
    </div>
      `
  }

  static _loadPreloader() {
    return `
        <div id='preloader' class="flex mt-auto mb-auto ml-auto mr-auto">
        <div class="loader ease-linear rounded-full border-8 border-t-8 border-gray-200"></div>
        </div>
      `
  }
}

export default App
