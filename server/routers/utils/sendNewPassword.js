import nodemailer from 'nodemailer';

import config from '../../config';

export default async function(email, password) {
  const mail = config.get('mail');
  const name = config.get('name');

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: mail.user,
      pass: mail.password
    }
  })

  const mailOptions = {
    from: mail.user,
    to: email,
    subject: name,
    text: `Новый пароль - "${password}"`
  }

  const response = await transporter.sendMail(mailOptions);

  return response;
}