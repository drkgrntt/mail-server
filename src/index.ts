import 'dotenv-safe/config'
import formData from 'form-data'
import express from 'express'
import cors from 'cors'
import { json, urlencoded } from 'body-parser'
import Mailgun from 'mailgun.js'
import { parseEmail } from './utils/parseEmail'
import path from 'path'

const main = async () => {
  const app = express()

  app.use(cors())
  app.use(json())
  app.use(urlencoded({ extended: true }))

  app.use(express.static(`${__dirname}/../templates`))

  app.post('/api/contact', async (req, res) => {
    try {
      const { contact, message } = req.body
      const contactInfo =
        '<ul>' +
        Object.entries(contact).reduce((current, [key, value]) => {
          return `${current}<li>${key}: ${value}</li>`
        }, '') +
        '</ul>'

      const mailer = new Mailgun(formData).client({
        username: 'api',
        key: process.env.MG_PRIVATE_KEY as string,
      })
      const from = 'Contact Service <contact@drkgrntt.com>'
      const to = process.env.TO_EMAILS?.split(' ')
      const subject = 'New Contact'
      const html = parseEmail('contact', {
        message,
        contact: contactInfo,
      })

      const sendResult = await mailer.messages.create(
        process.env.MG_DOMAIN as string,
        {
          from,
          to,
          subject,
          html,
        }
      )

      res.send({ sendResult })
    } catch (err) {
      res.send({ err })
    }
  })

  app.get('*', (_, res) => {
    res.sendFile(path.join(__dirname, '../templates/contact.html'))
  })

  app.listen(parseInt(process.env.PORT as string), () => {
    console.log(`Server started on ${process.env.PORT}`)
  })
}

try {
  main()
} catch (error) {
  console.error(error)
}
