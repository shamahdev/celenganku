/* eslint-disable max-len */
/* eslint-disable prefer-destructuring */
const formValidation = {
  async init({ formInputs, submitButton, isEdit = false }) {
    this._formInputs = formInputs
    this._submitButton = submitButton
    this._isEdit = isEdit
    this._inputTemp = {}
    await this._createEvent()
  },

  async _createEvent() {
    const formInputs = this._formInputs

    if (formInputs.length !== undefined) {
      formInputs.forEach((input) => {
        this._showPasswordToggle(input)
        if (this._isEdit) this._setTemp(input)
        input.addEventListener('keyup', (event) => {
          event.preventDefault()
          this._validateInput(input)
        })
      })
    } else {
      this._showPasswordToggle(formInputs)
      if (this._isEdit) this._setTemp(formInputs)
      formInputs.addEventListener('keyup', (event) => {
        event.preventDefault()
        this._validateInput(formInputs)
      })
    }
  },

  async _setTemp(input) {
    this._inputTemp[input.name] = input.value
  },

  async _showPasswordToggle(input) {
    if (input.type === 'password') {
      const passwordInputWrapper = document.createElement('div')

      const passwordToggleCheck = document.getElementById(`${input.id}-toggle`)

      if (passwordToggleCheck == null) {
        passwordInputWrapper.className = 'relative w-full'
        passwordInputWrapper.id = `${input.id}-wrapper`
        passwordInputWrapper.innerHTML = `
          <div class="absolute inset-y-0 right-0 flex items-center px-2">
            <input class="hidden password-toggle" id="${input.id}-toggle" type="checkbox">
            <label class="rounded px-2 py-1 text-sm text-gray-600 font-mono cursor-pointer password-label" for="${input.id}-toggle">
            <svg class="w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
        </svg>
            </label>
          </div>`
        input.parentElement.insertBefore(passwordInputWrapper, input)
        passwordInputWrapper.appendChild(input)
      }

      const passwordToggle = document.getElementById(`${input.id}-toggle`)

      passwordToggle.addEventListener('change', () => {
        const passwordLabel = passwordToggle.parentElement.querySelector('.password-label')
        if (input.type === 'password') {
          input.type = 'text'
          passwordLabel.innerHTML = `<svg class="w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>`
        } else {
          input.type = 'password'
          passwordLabel.innerHTML = `<svg class="w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
        </svg>`
        }
        input.focus()
      })
    }
  },

  async _validateInput(input) {
    const errorInputClasss = ['border-red-500', 'border-opacity-50', 'focus:border-red-500']
    const successInputClasss = ['border-green-500', 'border-opacity-50', 'focus:border-green-500']

    const alertElement = document.createElement('span')
    alertElement.className = 'text-sm text-red-500'
    alertElement.id = `${input.id}-alert`

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
        } else if (rule.includes('digit-more-than-')) {
          const moreThanDigit = parseInt(rule.replace('digit-more-than-', ''), 10)
          if (input.value.length < moreThanDigit) {
            alertText.push(`${input.name} harus minimal ${moreThanDigit} digit`)
          } else if (alertText.includes(`${input.name} harus minimal ${moreThanDigit} digit`)) {
            alertText.splice(alertText.indexOf(`${input.name} harus minimal ${moreThanDigit} digit`), 1)
          }
        } else if (rule.includes('value-more-than-')) {
          const moreThanValue = parseInt(rule.replace('value-more-than-', ''), 10)

          if (parseInt(input.value, 10) < moreThanValue) {
            alertText.push(`Minimal ${input.name} adalah ${moreThanValue + 1}`)
          } else if (alertText.includes(`Minimal ${input.name} adalah ${moreThanValue + 1}`)) {
            alertText.splice(alertText.indexOf(`Minimal ${input.name} adalah ${moreThanValue + 1}`), 1)
          }
        } else if (rule.includes('multiple-of-')) {
          const multipleValue = parseInt(rule.replace('multiple-of-', ''), 10)

          if ((parseInt(input.value, 10) % multipleValue) !== 0) {
            alertText.push(`${input.name} merupakan kelipatan ${multipleValue}`)
          } else if (alertText.includes(`${input.name} merupakan kelipatan ${multipleValue}`)) {
            alertText.splice(alertText.indexOf(`${input.name} merupakan kelipatan ${multipleValue}`), 1)
          }
        } else if (rule.includes('cannot-more-than-')) {
          const moreThanValue = parseInt(rule.replace('cannot-more-than-', ''), 10)

          if (parseInt(input.value, 10) > moreThanValue) {
            alertText.push(`${input.name} tidak bisa lebih dari jumlah saldo`)
          } else if (alertText.includes(`${input.name} tidak bisa lebih dari jumlah saldo`)) {
            alertText.splice(alertText.indexOf(`${input.name} tidak bisa lebih dari jumlah saldo`), 1)
          }
        } else if (rule.includes('email')) {
          if (!(input.value.includes('@') && (input.value.split('@')[1]).includes('.'))) {
            alertText.push(`${input.name} harus berisikan format: your@email.com`)
          } else if (alertText.includes(`${input.name} harus berisikan format: your@email.com`)) {
            alertText.splice(alertText.indexOf(`${input.name} harus berisikan format: your@email.com`), 1)
          }
        } else if (rule.includes('equal-')) {
          const equalElementValue = document.querySelector(`input[id="${rule.replace('equal-', '')}"]`)

          if (input.value !== equalElementValue.value) {
            alertText.push(`Input harus sama dengan ${equalElementValue.name}`)
          } else if (alertText.includes(`Input harus sama dengan ${equalElementValue.name}`)) {
            alertText.splice(alertText.indexOf(`Input harus sama dengan ${equalElementValue.name}`), 1)
          }
        }
      })
    }

    const toggleSubmitButton = () => {
      if (this._isEdit) {
        this._submitButton.disabled = false
      } else if (this._formInputs.length !== undefined) {
        let successInputNumber = 0
        this._formInputs.forEach((thisInput) => {
          if (thisInput.className.includes(...successInputClasss)) successInputNumber++
        })
        console.log(successInputNumber)
        if (successInputNumber === this._formInputs.length) {
          this._submitButton.disabled = false
        } else {
          this._submitButton.disabled = true
        }
      } else if (this._formInputs.className.includes(...successInputClasss)) {
        this._submitButton.disabled = false
      } else {
        this._submitButton.disabled = true
      }
    }

    const checkElement = document.getElementById(`${input.id}-alert`)
    if (alertText.length > 0) {
      this._submitButton.disabled = true
      input.classList.add(...errorInputClasss)
      input.classList.remove(...successInputClasss)
      if (typeof (checkElement) !== 'undefined' && checkElement != null) {
        checkElement.innerHTML = alertText[0]
      } else {
        alertElement.innerHTML = alertText[0]

        if (input.name === 'Password') {
          // eslint-disable-next-line max-len
          input.parentElement.parentElement.insertBefore(alertElement, input.parentElement.nextSibling)
        } else {
          input.parentElement.insertBefore(alertElement, input.nextSibling)
        }
      }
    } else {
      try {
        input.classList.remove(...errorInputClasss)
        input.classList.add(...successInputClasss)
        checkElement.remove()
      } catch (error) {
        // return null
      }
      toggleSubmitButton()
    }
  },
}

export default formValidation
