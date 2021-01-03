import formValidation from '../helper/form-validation'
import SlugParser from '../routes/slugparser'

const ModalInitializer = {
  async init({ title, content, bg = 'bg-primary' }) {
    this._title = title
    this._content = content
    this._bgColor = bg

    const isAlreadyInitialized = document.getElementById(`modal-${SlugParser.parseToSlug(this._title)}`)
    if (isAlreadyInitialized) {
      isAlreadyInitialized.classList.remove('hidden')
    } else {
      await this._render()
    }
  },

  async _render() {
    const modalElement = document.createElement('div')
    modalElement.id = `modal-${SlugParser.parseToSlug(this._title)}`
    modalElement.className = 'modal h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-50'
    modalElement.innerHTML = `<div class="rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 w-5/6 md:w-1/2 lg:w-1/3">
          <!-- modal header -->
          <div class="${this._bgColor} text-white rounded-t-lg px-6 py-4 flex justify-between items-center">
            <h3 class="text-md">${this._title}</h3>
          </div>
          ${this._content}
        </div>`
    document.body.appendChild(modalElement)
    await this._createEvent()

    const modalInputs = modalElement.querySelectorAll('input')
    const formSubmit = modalElement.querySelector('button[data-submit]')

    modalInputs.forEach((input) => {
      if (input.type === 'password') {
        const passwordToggle = document.querySelector('.password-toggle')

        passwordToggle.addEventListener('change', () => {
          const passwordLabel = document.querySelector('.password-label')
  
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
    })

    if (typeof (formSubmit) !== 'undefined' && formSubmit != null) {
      await formValidation.init({
        formInputs: modalInputs,
        submitButton: formSubmit,
      })
    }
  },

  async _createEvent() {
    window.onclick = (event) => {
      if (event.target.id.indexOf('modal') >= 0) {
        event.target.remove()
      }
    }
    const formButtons = document.querySelectorAll(`button[data-modal="${this._title}"], a[data-modal="${this._title}"]`)
    formButtons.forEach((button) => {
      button.addEventListener('click', () => {
        document.getElementById(`modal-${SlugParser.parseToSlug(this._title)}`).remove()
      })
    })
  },
}

export default ModalInitializer
