import nodemailer from 'nodemailer'
import { sendmail } from '../services/mail.service'

jest.mock('nodemailer', () => ({
  createTransport: jest.fn(() => ({
    sendMail: jest.fn()
  }))
}))

describe('sendMail', () => {
  test('sends email with the provided details', async () => {
    const mockedTransporter = nodemailer.createTransport()
    const mockedSendMail = mockedTransporter.sendMail as 
    jest.MockedFunction<typeof mockedTransporter.sendMail>

    const email = 'florian38@ethereal.email'
    const token = 'qD74kPN7jAEBWyb1st'

    expect(mockedSendMail).toHaveBeenCalledWith({
      from: '"REST API" <restapimicroblog@sample.com>',
      to: email,
      subject: 'REST API email confirmation',
      text: token
    })
  })

  test('logs error message if sending email fails', async () => {
    const mockedTransporter = nodemailer.createTransport()
    const mockedSendMail = mockedTransporter.sendMail as jest.MockedFunction<
      typeof mockedTransporter.sendMail
    >

    const email = 'test@example.com'
    const token = '123456'

    const errorMessage = 'Failed to send email'
    mockedSendMail.mockRejectedValueOnce(new Error(errorMessage))

    console.error = jest.fn()

    expect(mockedSendMail).toHaveBeenCalledWith({
      from: '"REST API" <restapimicroblog@sample.com>',
      to: email,
      subject: 'REST API email confirmation',
      text: token
    })
    expect(console.error).toHaveBeenCalledWith(errorMessage)
  })
})
