import nodemailer from 'nodemailer'

// you can get your own email and password at https://ethereal.email/
// also you can check the inbox on that same page after creating a user
export async function sendmail(email:string, token: string) {
  let transporter =  nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'florian38@ethereal.email',
      pass: 'qD74kPN7jAEBWyb1st'
    }
  })
  try {
    await transporter.sendMail({
      from: '"REST API" <restapimicroblog@sample.com>',
      to: `${email}`,
      subject: 'REST API email confirmation',
      text: `${token}`
    })
  } catch (error) {
    console.error(error.message)
  }
}
