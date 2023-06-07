import 'dotenv/config'
import { sendmail } from './mail.service'
import { PrismaClient, User } from '@prisma/client'
import { hashSync, compareSync } from 'bcrypt'
import { verify, sign, JwtPayload } from 'jsonwebtoken'
import { Unauthorized, NotFound, Conflict, BadRequest, InternalServerError } from 'http-errors'
import { ValidationResult } from 'joi'

const prisma = new PrismaClient()

interface LoginBody {
  email: string
  password: string
}

export async function update(input: ValidationResult<User>) {
  const { value, error } = input

  if (error) {
    throw new BadRequest('Error validating the body')
  }

  const user = await prisma.user.findUnique({ where: { id: value.id } })

  if (!user) {
    throw new NotFound('User not found')
  }

  await prisma.user.update({
    where: { id: value.id },
    data: input
  })
}

export async function remove(id: string) {
  const user = await prisma.user.findUnique({ where: { id: id } })

  if (!user) {
    throw new NotFound('User not found')
  }

  await prisma.user.delete({ where: { id: user.id } })
}

export async function login(input: ValidationResult<LoginBody>) {
  const { value, error } = input

  if (error) {
    throw new BadRequest('Missing values in submit')
  }

  const user = await prisma.user.findUnique({ where: { email: value.email } })

  if (!user) {
    throw new NotFound('Use not found')
  }

  const handshake = compareSync(value.password, user.password)

  if (!handshake) {
    throw new Unauthorized('Email or password incorrect')
  }

  const { jti } = await saveToken(user.id)
  return generateToken(jti)
}

export async function logout(token: string) {
  if (!token) { 
    throw new Unauthorized('Missing token')
  }

  const { sub } = verify(token, process.env.JWT_SECRET_KEY)

  await prisma.token.delete({ where: { jti: sub as string } })
}

export async function register(input: ValidationResult<User>) {
  const { value, error } = input

  if (error) {
    throw new BadRequest('Invalid submit')
  }

  const ref = await prisma.user.findUnique({ where: { email: value.email } })

  if (ref) {
    throw new Conflict('Email already exists')
  }

  const user = await prisma.user.create({
    data: {
      email: value.email,
      password: hashSync(value.password, 10),
      nickname: value.nickname,
      firstname: value.firstname,
      lastname: value.lastname
    }
  })

  if (!user) {
    throw new InternalServerError('User couldnt be saved')
  }

  const token = await saveToken(user.id)
  const tokenResponse = await generateToken(token.jti)

  sendmail(user.email, tokenResponse.token)

  return tokenResponse
}

export async function saveToken(id: string) {
  const token = await prisma.token.create({
    data: {
      userId: id
    }
  })

  if (!token) {
    throw new NotFound('User not found')
  }

  return token
}

export async function generateToken(sub: string) {
  const now = new Date().getTime()
  const exp = Math.floor(
    new Date(now).setSeconds(parseInt(process.env.JWT_EXPIRATION_TIME, 10)) / 1000
  )

  const iat = Math.floor(now / 1000)

  const token = sign({ sub, iat, exp }, process.env.JWT_SECRET_KEY)

  return { token, exp }
}

export async function confirmEmailToken(token: string) {
  const decoded = verify(token, process.env.JWT_EMAIL_CONFIRMATION_SECRET_KEY) as JwtPayload

  const tokenFound = await prisma.token.findFirst({ where: { jti: decoded.sub } })

  if (!tokenFound) {
    throw new Unauthorized('Invalid token')
  }

  const update = await prisma.user.update({
    where: { id: tokenFound.userId },
    data: { verified: true }
  })

  if (!update) {
    throw new InternalServerError('Server error')
  }
}
