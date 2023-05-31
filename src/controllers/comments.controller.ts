import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import * as Service from '../services/accounts.service'

export async function createComment(req: Request, res: Response): Promise<void> {
  res.sendStatus(501)
}

export async function updateComment(req: Request, res: Response): Promise<void> {
  res.sendStatus(501)
}

export async function readComment(req: Request, res: Response): Promise<void> {
  res.sendStatus(501)
}

export async function readComments(req: Request, res: Response): Promise<void> {
  res.sendStatus(501)
}

export async function deleteComment(req: Request, res: Response): Promise<void> {
  res.sendStatus(501)
}