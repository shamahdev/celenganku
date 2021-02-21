/* eslint-disable class-methods-use-this */
class Sidebar extends HTMLElement {
  set role(role) {
    this._role = role
    this._render()
  }

  _bgColor() {
    let colorClass = 'bg-primary'
    if (this._role === 'admin') {
      colorClass = 'bg-secondary'
    }
    return colorClass
  }

  _renderNavsByRole() {
    const role = this._role
    let navs = ''
    if (role === 'admin') {
      // Admin navs
      navs = /* html */`<a class="btn-nav rounded-b-lg md:rounded-none md:rounded-l-lg" href="#">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
        </a>
        <a class="btn-nav rounded-b-lg md:rounded-none md:rounded-l-lg" href="#/data">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
        </a>`
    } else {
      // User/Siswa Navs
      navs = /* html */`
        <a class="btn-nav rounded-b-lg md:rounded-none md:rounded-l-lg" href="#">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
        </a>
        <a class="btn-nav rounded-b-lg md:rounded-none md:rounded-l-lg" href="#/transaction">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
        </a>
        <a class="btn-nav rounded-b-lg md:rounded-none md:rounded-l-lg" href="#/report">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
        </a>
        <a class="btn-nav rounded-b-lg md:rounded-none md:rounded-l-lg" href="#/profile">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </a>
        `
    }
    return navs
  }

  _render() {
    this.className = `${this._bgColor()} print:hidden z-50 fixed bottom-0 w-full md:relative md:w-auto md:h-auto md:min-h-screen`
    this.innerHTML = `
    <div id="navs" class="sticky top-0 flex flex-row justify-evenly md:flex-col">
        <p class="h-16 w-16 p-4 text-white">
            <img src="./images/app-icon.png">
            <g stroke="null">
                <ellipse stroke="#000" ry="4.54353" rx="4.54353" id="svg_2" cy="12" cx="5.51189" stroke-width="0" fill="#ffffff"/>
                <ellipse stroke="#000" ry="4.54353" rx="4.54353" id="svg_3" cy="12" cx="18.48811" stroke-width="0" fill="#ffffff"/>
            </g>
            </svg>
        </p>
        ${this._renderNavsByRole()}
    </div>`
  }
}
customElements.define('side-bar', Sidebar)
