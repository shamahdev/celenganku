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
    modalElement.className = 'modal h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-50 z-50'
    modalElement.innerHTML = `<div class="animate__animated animate__zoomIn animate__faster rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 w-5/6 md:w-1/2 lg:w-1/3">
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

    if (typeof (formSubmit) !== 'undefined' && formSubmit != null) {
      await formValidation.init({
        formInputs: modalInputs,
        submitButton: formSubmit,
      })
    }
  },

  async _createEvent() {
    window.onmousedown = (event) => {
      if (event.target.id.indexOf(`modal-${SlugParser.parseToSlug(this._title)}`) >= 0) {
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
