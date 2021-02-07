const Sidebar = {
  async init({
    sidebar,
  }) {
    this._sidebar = sidebar
    this.highlight('/')
  },

  async highlight(page) {
    const navLinks = this._sidebar.querySelectorAll('a.btn-nav')
    if (page === '/') page = ''
    navLinks.forEach((navElement) => {
      navElement.classList.remove('active')
      if (page === navElement.hash.substring(1)) {
        navElement.classList.add('active')
      }
    })
  },

  setState(state = true, role = 'user') {
    if (state) {
      this._sidebar.classList.remove('hidden')
      this._sidebar.type = role
    } else {
      this._sidebar.classList.add('hidden')
    }
  }
}

export default Sidebar
