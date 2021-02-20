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
    if (role === 'user') {
      // Admin navs
      links = /* html */`
        <a href="#/profile" class="flex px-4 py-3 text-sm font-normal text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          role="menuitem">
          <i class="text-primary flex"><svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg></i>
          <p class="flex ml-2 leading-relaxed">Lihat Profil</p>
        </a>
        <a href="#" class="flex px-4 py-3 text-sm font-normal text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          role="menuitem">
          <i class="text-primary flex"><svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg></i>
          <p class="flex ml-2 leading-relaxed">Tentang Celenganku</p>
        </a>
        <a href="/api/logout" class="flex px-4 py-3 text-sm font-normal text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          role="menuitem">
          <i class="text-primary flex"><svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg></i>
          <p class="flex ml-2 leading-relaxed">Keluar</p>
        </a>
        `
    } else {
      // User/Siswa Navs
      links = /* html */`
        <a href="#/profile" class="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Edit Profil</a>
        <a href="#/help" class="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Bantuan</a>
          <a href="/api/logout" class="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900" role="menuitem">
            Keluar
          </a>`
    }
    return links
  }

  _render() {
    const name = this._name
    const avatar = this._avatar || `http://ui-avatars.com/api/?name=${name}&background=fff`
    this.className = `${this._bgColor()} print:hidden z-50 sticky top-0 bg-white rounded-b-lg flex flex-wrap items-center md:rounded-bl-none md:h-16 pt-2 pb-2 md:justify-end`
    this.innerHTML = /* html */`
          <div class="flex w-full p-4 md:p-0 md:w-auto">
            <div class="flex relative w-10 h-10 justify-center items-center m-1 mr-2 text-xl rounded-full text-white">
              <img class="w-10 h-10 rounded-full object-cover" src="${avatar}" alt="${name} Photo Profile">
            </div>
            <div class="flex flex-col leading-tight mt-1 md:text-white px-1">
              <p class="font-light">Halo,</p>
              <p class="font-light" id="greeting-username">${name}</p>
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
