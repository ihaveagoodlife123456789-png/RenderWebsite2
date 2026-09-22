import nodemailer from 'nodemailer'

import sgMail from '@sendgrid/mail'
import 'dotenv/config';

sgMail.setApiKey(process.env.SENDGRID_SECRET)

const transporter = nodemailer.createTransport({
    host: 'smtp.sendgrid.net',
    port: 587,
    secure: false,
    auth: {
        user: 'apikey',
        pass: process.env.SENDGRID_SECRET
    }
})

const message = {
  from: "ihaveagoodlife123456789@gmail.com",
  to: "ihaveagoodlife123456789@gmail.com",
  subject: "Hello World",
  text: "This is the plaintext version of the email.",
  html: "<p>This is the <strong>HTML version</strong> of the email.</p>",
}

async function sendEmail() {
    try {
        const send = await transporter.sendMail(message)
        send ? console.log('Sent!') : console.log('Somthing went wrong...')
    } catch (err) {
        console.log('Somthing went wrong', err)
    }
}

sendEmail()


