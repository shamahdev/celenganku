/* eslint-disable prefer-destructuring */
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
    const errorInputClasss = ['border-red-500', 'border-opacity-50', 'focus:border-red-500']
    const successInputClasss = ['border-green-500', 'border-opacity-50', 'focus:border-green-500']

    const alertElement = document.createElement('span')
    alertElement.className = 'text-sm text-red-500'
    alertElement.id = `${this.name}-alert`
    
    const alertText = []
    
    if ('rule' in this.dataset) {
      const validationRules = this.dataset.rule.split(' ')
      validationRules.forEach((rule) => {
        if (rule === 'required') {
          if (this.value === '') {
            alertText.push(`${this.name} tidak boleh kosong`)
          } else if (alertText.includes(`${this.name} tidak boleh kosong`)) {
            alertText.splice(alertText.indexOf(`${this.name} tidak boleh kosong`), 1)
          }
        } else if (rule === 'no-space') {
          if (this.value.indexOf(' ') >= 0) {
            alertText.push(`${this.name} tidak boleh mengandung spasi`)
          } else if (alertText.includes(`${this.name} tidak boleh mengandung spasi`)) {
            alertText.splice(alertText.indexOf(`${this.name} tidak boleh mengandung spasi`), 1)
          }
        }
        console.log(alertText)
      })
    }

    const checkElement = document.getElementById(`${this.name}-alert`)
    if (alertText.length > 0) {
      this.classList.add(...errorInputClasss)
      if (typeof (checkElement) !== 'undefined' && checkElement != null) {
        checkElement.innerHTML = alertText[0]
      } else {
        alertElement.innerHTML = alertText[0]
        this.parentElement.insertBefore(alertElement, this.nextSibling)
      }
    } else {
      try {
        this.classList.remove(...errorInputClasss)
        checkElement.remove()
      } catch (error) {
        return null
      }
    }
  },
}

export default formValidation
