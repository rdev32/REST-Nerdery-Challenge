import 'dotenv/config'
import { Request, Response, NextFunction } from 'express'
import { verify, JwtPayload } from 'jsonwebtoken'
import { Unauthorized } from 'http-errors'
import { PrismaClient, User } from '@prisma/client'

const prisma = new PrismaClient()

export async function protect(req: Request, res: Response, next: NextFunction) {
  if (!req.headers.authorization) {
    throw new Unauthorized('Bearer missing')
  }

  const token = req.headers.authorization?.replace('Bearer ', '')

  if (!token) {
    throw new Unauthorized('Invalid token')
  }

  const payload = verify(token, process.env.JWT_SECRET_KEY) as JwtPayload
  console.log(payload)
  try {
    const tokenFound = await prisma.token.findUniqueOrThrow({
      where: { jti: payload.sub }
    })

    const user = await prisma.user.findFirst({ where: { id: tokenFound.userId } })

    req.user = user
    next()
  } catch (error) {
    res.status(401).json({ message: 'User not found' })
  }
}

export async function authorize(req: Request, res: Response, next: NextFunction) {
  if (!req.user) {
    throw new Unauthorized('You must login first')
  }

  next()
}
