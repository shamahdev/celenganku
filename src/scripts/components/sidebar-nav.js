/* eslint-disable class-methods-use-this */
class Sidebar extends HTMLElement {
  set type(type) {
    this._type = type
    this._render()
  }

  _bgColor() {
    let colorClass = 'bg-primary'
    if (this._type === 'admin') {
      colorClass = 'bg-blue-500'
    }
    return colorClass
  }

  _renderNavsByType() {
    const type = this._type
    let navs = ''
    if (type === 'admin') {
      // Admin navs
      navs = `<a class="btn-nav rounded-b-lg md:rounded-none md:rounded-l-lg active" href="#/admin">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
        </a>
        <a class="btn-nav rounded-b-lg md:rounded-none md:rounded-l-lg" href="#/admin/pay">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </a>
        <a class="btn-nav rounded-b-lg md:rounded-none md:rounded-l-lg" href="#/admin/data">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </a>`
    } else {
      // User/Siswa Navs
      navs = `<a class="btn-nav rounded-b-lg md:rounded-none md:rounded-l-lg active" href="#/dashboard">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </a>
        <a class="btn-nav rounded-b-lg md:rounded-none md:rounded-l-lg" href="#/pay">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
        </a>
        <a class="btn-nav rounded-b-lg md:rounded-none md:rounded-l-lg" href="#/profile">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </a>`
    }
    return navs
  }

  _render() {
    this.className = `${this._bgColor()} fixed bottom-0 w-full md:relative md:w-auto md:h-auto md:min-h-screen`
    this.innerHTML = `
    <div id="navs" class="sticky top-0 flex flex-row justify-evenly md:flex-col">
        <p class="h-16 w-16 p-4 text-white">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <g stroke="null">
                <ellipse stroke="#000" ry="4.54353" rx="4.54353" id="svg_2" cy="12" cx="5.51189" stroke-width="0" fill="#ffffff"/>
                <ellipse stroke="#000" ry="4.54353" rx="4.54353" id="svg_3" cy="12" cx="18.48811" stroke-width="0" fill="#ffffff"/>
            </g>
            </svg>
        </p>
        ${this._renderNavsByType()}
    </div>`
  }
}
customElements.define('sidebar-nav', Sidebar)
