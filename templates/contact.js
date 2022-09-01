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

    const validation = event.target.querySelector('.validation')
    const setValidation = (message) => {
      validation.textContent = message
      setTimeout(() => {
        validation.textContent = ''
      }, 7000)
    }

    if (
      !payload.message ||
      !payload.contact.name ||
      !(payload.contact.phone || payload.contact.email)
    ) {
      setValidation(
        'Please include your name, your phone or email, and a message!'
      )
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
        setValidation("Thanks, I'll be in touch :)")
        message.value = ''
        name.value = ''
        phone.value = ''
        email.value = ''
      })
  })
}
