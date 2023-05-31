import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import * as Service from '../services/accounts.service'

export async function login(req: Request, res: Response): Promise<void> {
  res.sendStatus(501)
}

export async function logout(req: Request, res: Response): Promise<void> {
  res.sendStatus(501)
}

export async function register(req: Request, res: Response): Promise<void> {
  res.sendStatus(501)
}

export async function modifyAccount(req: Request, res: Response): Promise<void> {
  res.sendStatus(501)
}

export async function deleteAccount(req: Request, res: Response): Promise<void> {
  res.sendStatus(501)
}