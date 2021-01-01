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
        } else if (rule.includes('number-must-')) {
          const mustNumber = parseInt(rule.replace('number-must-', ''), 10)

          if (this.value.length < mustNumber || this.value.length > mustNumber) {
            alertText.push(`${this.name} harus berisi ${mustNumber} digit angka`)
          } else if (alertText.includes(`${this.name} harus berisikan ${mustNumber} digit angka`)) {
            alertText.splice(alertText.indexOf(`${this.name} harus berisi ${mustNumber} digit angka`), 1)
          }
        } else if (rule.includes('email')) {
          if (!(this.value.includes('@') && (this.value.split('@')[1]).includes('.'))) {
            alertText.push(`${this.name} harus berisikan format: your@email.com`)
          } else if (alertText.includes(`${this.name} harus berisikan format: your@email.com`)) {
            alertText.splice(alertText.indexOf(`${this.name} harus berisikan format: your@email.com`), 1)
          }
        } else if (rule.includes('equal-')) {
          const equalElementValue = document.querySelector(`input[data-equal="${rule.replace('equal-', '')}"]`)

          if (this.value !== equalElementValue.value) {
            alertText.push(`Input harus sama dengan ${equalElementValue.name}`)
          } else if (alertText.includes(`Input harus sama dengan ${equalElementValue.name}`)) {
            alertText.splice(alertText.indexOf(`Input harus sama dengan ${equalElementValue.name}`), 1)
          }
        }
      })
    }

    const checkElement = document.getElementById(`${this.name}-alert`)
    if (alertText.length > 0) {
      this.classList.add(...errorInputClasss)
      this.classList.remove(...successInputClasss)
      if (typeof (checkElement) !== 'undefined' && checkElement != null) {
        checkElement.innerHTML = alertText[0]
      } else {
        alertElement.innerHTML = alertText[0]
        this.parentElement.insertBefore(alertElement, this.nextSibling)
      }
    } else {
      try {
        this.classList.remove(...errorInputClasss)
        this.classList.add(...successInputClasss)
        checkElement.remove()
      } catch (error) {
        return null
      }
    }
  },
}

export default formValidation
