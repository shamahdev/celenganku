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
    if (this.value === '') {
      // this.classList.add('border-2', 'border-red-500', 'border-opacity-50')
    }
  },
}

export default formValidation
