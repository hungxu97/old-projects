const form = document.querySelector('.form')
const username = document.querySelector('#username')
const email = document.querySelector('#email')
const password = document.querySelector('#password')
const password2 = document.querySelector('#password2')

let validUser = true

const isEmailValid = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

const checkRequire = (...inputs) => {
  inputs.forEach((input) => {
    const id = input.id

    if (input.value.trim() === '') {
      id === 'username' ? (validUser = false) : ''
      showError(input, `${getFieldName(input)} is required`)
    } else {
      id === 'username' ? (validUser = true) : ''
      showSuccess(input)
    }
  })
}

const checkLength = (input, min, max) => {
  if (!validUser) return

  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    )
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters`
    )
  } else {
    showSuccess(input)
  }
}

const getFieldName = (input) =>
  input.id.charAt(0).toUpperCase() + input.id.slice(1)

const showSuccess = (input) => {
  const formControl = input.parentElement
  formControl.classList = 'form-control success'
}

const showError = (input, message) => {
  const formControl = input.parentElement
  const small = formControl.querySelector('small')

  formControl.classList = 'form-control error'
  small.textContent = message
}

form.addEventListener('submit', (e) => {
  e.preventDefault()

  checkRequire(username, email, password, password2)
  checkLength(username, 3, 15)
  checkLength(password, 6, 18)
})
