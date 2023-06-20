import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

let transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export const sendActivationMail = async (to, link) => {
  await transporter.sendMail({
    from: `Супер Шаурма <${process.env.SMTP_USER}>`,
    to,
    subject: `Подтверждение почты для сайта ${process.env.CLIENT_URL}`,
    text: '',
    html: `
      <div>
        <h2>Для подтверждения почты ${to} перейдите по ссылке:</h2>
        <a href='${link}'>${link}</a>
      </div>
    `,
  })
}
