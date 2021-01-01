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
      // eslint-disable-next-line func-names
      input.addEventListener('keyup', (event) => {
        event.preventDefault()
        this._validateInput(input)
      })
    })
  },

  async _validateInput(input) {
    const errorInputClasss = ['border-red-500', 'border-opacity-50', 'focus:border-red-500']
    const successInputClasss = ['border-green-500', 'border-opacity-50', 'focus:border-green-500']

    const alertElement = document.createElement('span')
    alertElement.className = 'text-sm text-red-500'
    alertElement.id = `${input.name}-alert`

    const alertText = []

    if ('rule' in input.dataset) {
      const validationRules = input.dataset.rule.split(' ')
      validationRules.forEach((rule) => {
        if (rule === 'required') {
          if (input.value === '') {
            alertText.push(`${input.name} tidak boleh kosong`)
          } else if (alertText.includes(`${input.name} tidak boleh kosong`)) {
            alertText.splice(alertText.indexOf(`${input.name} tidak boleh kosong`), 1)
          }
        } else if (rule === 'no-space') {
          if (input.value.indexOf(' ') >= 0) {
            alertText.push(`${input.name} tidak boleh mengandung spasi`)
          } else if (alertText.includes(`${input.name} tidak boleh mengandung spasi`)) {
            alertText.splice(alertText.indexOf(`${input.name} tidak boleh mengandung spasi`), 1)
          }
        } else if (rule.includes('number-must-')) {
          const mustNumber = parseInt(rule.replace('number-must-', ''), 10)

          if (input.value.length < mustNumber || input.value.length > mustNumber) {
            alertText.push(`${input.name} harus berisi ${mustNumber} digit angka`)
          } else if (alertText.includes(`${input.name} harus berisikan ${mustNumber} digit angka`)) {
            alertText.splice(alertText.indexOf(`${input.name} harus berisi ${mustNumber} digit angka`), 1)
          }
        } else if (rule.includes('email')) {
          if (!(input.value.includes('@') && (input.value.split('@')[1]).includes('.'))) {
            alertText.push(`${input.name} harus berisikan format: your@email.com`)
          } else if (alertText.includes(`${input.name} harus berisikan format: your@email.com`)) {
            alertText.splice(alertText.indexOf(`${input.name} harus berisikan format: your@email.com`), 1)
          }
        } else if (rule.includes('equal-')) {
          const equalElementValue = document.querySelector(`input[data-equal="${rule.replace('equal-', '')}"]`)

          if (input.value !== equalElementValue.value) {
            alertText.push(`Input harus sama dengan ${equalElementValue.name}`)
          } else if (alertText.includes(`Input harus sama dengan ${equalElementValue.name}`)) {
            alertText.splice(alertText.indexOf(`Input harus sama dengan ${equalElementValue.name}`), 1)
          }
        }
      })
    }

    const checkElement = document.getElementById(`${input.name}-alert`)
    if (alertText.length > 0) {
      input.classList.add(...errorInputClasss)
      input.classList.remove(...successInputClasss)
      if (typeof (checkElement) !== 'undefined' && checkElement != null) {
        checkElement.innerHTML = alertText[0]
      } else {
        alertElement.innerHTML = alertText[0]
        input.parentElement.insertBefore(alertElement, input.nextSibling)
      }
    } else {
      try {
        input.classList.remove(...errorInputClasss)
        input.classList.add(...successInputClasss)
        checkElement.remove()
      } catch (error) {
        // return null
      }
    }

    const validatedCounts = document.querySelectorAll('input.border-green-500')
    if (validatedCounts.length === this._formInputs.length) {
      this._submitButton[0].disabled = false
    } else {
      this._submitButton[0].disabled = true
    }
  },
}

export default formValidation
