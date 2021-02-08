/* eslint-disable class-methods-use-this */
class Appbar extends HTMLElement {
  set role(role) {
    this._role = role
    this._render()
  }

  set name(name) {
    this._name = name
    this._render()
  }

  set avatar(avatar) {
    this._avatar = avatar
    this._render()
  }

  _bgColor() {
    let colorClass = 'md:bg-primary'
    if (this._role === 'admin') {
      colorClass = 'md:bg-blue-500'
    }
    return colorClass
  }

  _renderLinksByRole() {
    const role = this._role
    let links = ''
    if (role === 'admin') {
      // Admin navs
      links = `
        <a href="#/profile" class="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Edit Profil</a>
        <a href="#/help" class="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Bantuan</a>
          <a href="#/" class="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900" role="menuitem">
            Keluar
          </a>`
    } else {
      // User/Siswa Navs
      links = `
        <a href="#/profile" class="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Edit Profil</a>
        <a href="#/help" class="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Bantuan</a>
          <a href="#/" class="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900" role="menuitem">
            Keluar
          </a>`
    }
    return links
  }

  _render() {
    const name = this._name
    const avatar = this._avatar || `https://ui-avatars.com/api/?name=${name}`
    this.className = `${this._bgColor()} sticky top-0 bg-white rounded-b-lg flex flex-wrap items-center md:rounded-bl-none md:h-16 md:justify-end`
    this.innerHTML = `
          <div class="flex w-full p-4 md:p-0 md:w-auto">
            <div class="flex relative w-10 h-10 justify-center items-center m-1 mr-2 text-xl rounded-full text-white">
              <img class="rounded-full" src="${avatar}" alt="${name} Photo Profile">
            </div>
            <div class="flex flex-col leading-tight mt-1 md:text-white px-1">
              <p class="font-light">Halo,</p>
              <p id="greeting-username">${name}</p>
            </div>
            <button id="settings" class="h-12 w-12 p-3 mr-3 md:text-white ml-auto md:ml-0">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div id="settings-dropdown" class="hidden origin-top-right absolute right-0 mt-10 mr-5 w-56 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              <div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                ${this._renderLinksByRole()}
              </div>
            </div>
          </div>`
  }
}
customElements.define('app-bar', Appbar)
