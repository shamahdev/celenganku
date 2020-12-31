const formValidation = {
  async init({ formInputs, submitButton }) {
    this._formInputs = formInputs
    this._submitButton = submitButton
    await this._createEvent()
  },

  async _createEvent() {
    const formInputs = this._formInputs
    formInputs.forEach((input) => {
      input.addEventListener('keyup', this._validateInput.bind(input))
    })
  },

  _validateInput() {
    const alertElement = document.createElement('span')
    alertElement.className = 'text-sm text-red-500'
    alertElement.id = `${this.name}-alert`
    let alertText = ''


    const errorInputClasss = ['border-red-500', 'border-opacity-50', 'focus:border-red-500', 'focus:border-opcaity-50']
    if (this.value === '') {
      this.classList.add(...errorInputClasss)
      alertText = `${this.name} tidak boleh kosong`
      console.log(alertText)
    } else {
      this.classList.remove(...errorInputClasss)
      alertText = ''
    }

    const checkElement = document.getElementById(`${this.name}-alert`)
    if (alertText !== '') {
      if (typeof (checkElement) !== 'undefined' && checkElement != null) {
        checkElement.innerHTML = alertText
      } else {
        alertElement.innerHTML = alertText
        this.parentElement.insertBefore(alertElement, this.nextSibling)
      }
    } else {
      try {
        checkElement.remove()
      } catch (error) {
        return null
      }
    }
  },
}

export default formValidation
