/* 
  -- para hacer un controlador --
  primero sacas la data del request
  despues lo validas, si es que se tiene que validar
  luego usas el servicio con la data validada
  y finalmente respondes con el status code, si tiene respuesta la mandas cmo json
*/

import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import * as Service from '../services/accounts.service'

export async function createPost(req: Request, res: Response): Promise<void> {
  res.sendStatus(501)
}

export async function updatePost(req: Request, res: Response): Promise<void> {
  res.sendStatus(501)
}

export async function readPost(req: Request, res: Response): Promise<void> {
  res.sendStatus(501)
}

export async function readPosts(req: Request, res: Response): Promise<void> {
  res.sendStatus(501)
}

export async function deletePost(req: Request, res: Response): Promise<void> {
  res.sendStatus(501)
}