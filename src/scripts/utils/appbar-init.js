const Appbar = {
  async init({
    appbar,
  }) {
    this._appbar = appbar
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
