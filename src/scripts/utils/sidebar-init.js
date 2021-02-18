const Sidebar = {
  async init({
    sidebar,
  }) {
    this._sidebar = sidebar
    // this.highlight('/')
  },

  async highlight(page) {
    const navLinks = this._sidebar.querySelectorAll('a.btn-nav')
    if (page === '/') page = ''
    navLinks.forEach((navElement) => {
      if (page === '') navLinks[0].classList.add('active')
      else if (page !== '' && page.includes(navElement.hash.substring(1))) {
        navLinks[0].classList.remove('active')
        navElement.classList.add('active')
      } else {
        navElement.classList.remove('active')
      }
    })
  },

  setState(state = true, role = 'user') {
    if (state) {
      this._sidebar.classList.remove('hidden')
      this._sidebar.role = role
    } else {
      this._sidebar.classList.add('hidden')
    }
  },
}

export default Sidebar
