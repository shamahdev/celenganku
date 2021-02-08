const Appbar = {
  async init({ appbar }) {
    this._appbar = appbar
  },

  setHeader(name, avatar) {
    this._appbar.name = name
    this._appbar.avatar = avatar
  },

  setState(state = true, role = 'user') {
    if (state) {
      this._appbar.classList.remove('hidden')
      this._appbar.role = role
    } else {
      this._appbar.classList.add('hidden')
    }
  },
}

export default Appbar
