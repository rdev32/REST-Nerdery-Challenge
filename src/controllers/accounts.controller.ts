import { Request, Response } from 'express'
import * as Service from '../services/accounts.service'
import * as Validate from '../utils/validations'

export async function login(req: Request, res: Response): Promise<void> {
  const submit = Validate.loginSubmit(req.body)
  const token = await Service.login(submit)
  res.status(200).json(token)
}

export async function logout(req: Request, res: Response): Promise<void> {
  const accessToken = req.headers.authorization?.replace('Bearer ', '')
  await Service.logout(accessToken)
  res.sendStatus(204)
}

export async function register(req: Request, res: Response): Promise<void> {
  const input = Validate.register(req.body)
  const token = await Service.register(input)
  res.status(201).json(token)
}

export async function modifyAccount(req: Request, res: Response): Promise<void> {
  const input = Validate.userEdit(req.body)
  await Service.update(input)
  res.sendStatus(204)
}

export async function deleteAccount(req: Request, res: Response): Promise<void> {
  const token = req.headers.authorization?.replace('Bearer ', '')
  await Service.remove(token)
  res.sendStatus(204)
}

export async function confirmation(req: Request, res: Response): Promise<void> {
  await Service.confirmEmailToken(req.query.token as string)
  res.sendStatus(204)
}
