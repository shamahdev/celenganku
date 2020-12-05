const SidebarNavigation = {
  async init({
    sidebar
  }) {
    this._sidebar = sidebar
    this.highlight('/')
  },

  async highlight(page) {
    const navLinks = this._sidebar.querySelectorAll('a.btn-nav')
    if (page === '/') page = ''
    navLinks.forEach(navElement => {
      navElement.classList.remove('active')
      if (page === navElement.hash.substring(1)) {
        navElement.classList.add('active')
      }
    })
  }
}

export default SidebarNavigation