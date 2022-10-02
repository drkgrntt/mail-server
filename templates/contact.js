window.onload = () => {
  const form = document.querySelector('#contact-form')
  form.addEventListener('submit', (event) => {
    event.preventDefault()

    const name = event.target.querySelector('#name')
    const phone = event.target.querySelector('#phone')
    const email = event.target.querySelector('#email')
    const message = event.target.querySelector('#message')

    const payload = {
      message: message.value,
      contact: {
        name: name.value,
        phone: phone.value,
        email: email.value,
      },
    }

    const nameField = event.target.querySelector('[data-name]')
    const phoneField = event.target.querySelector('[data-phone]')
    const emailField = event.target.querySelector('[data-email]')
    const messageField = event.target.querySelector('[data-message]')

    const setValidation = (field, message) => {
      field.setAttribute('validation', message)
      setTimeout(() => {
        field.setAttribute('validation', '')
      }, 7000)
    }

    if (!payload.message) {
      setValidation(messageField, 'Please include a message!')
    }
    if (!payload.contact.name) {
      setValidation(nameField, 'Please include your name!')
    }
    if (!(payload.contact.phone || payload.contact.email)) {
      setValidation(emailField, 'Please include your phone or email!')
      setValidation(phoneField, 'Please include your phone or email!')
    }
    if (
      !payload.message ||
      !payload.contact.name ||
      !(payload.contact.phone || payload.contact.email)
    ) {
      return
    }

    fetch('/api/contact', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log({ res })
        setValidation(messageField, "Thanks, I'll be in touch :)")
        message.value = ''
        name.value = ''
        phone.value = ''
        email.value = ''
      })
  })
}
