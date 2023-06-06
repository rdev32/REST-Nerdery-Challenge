import { Request, Response } from 'express'
import * as Service from '../services/comments.service'
import * as Validate from '../utils/validations'

export async function createComment(req: Request, res: Response): Promise<void> {
  const input = Validate.commentSubmit(req.body)
  await Service.create(input)
  res.sendStatus(201)
}

export async function updateComment(req: Request, res: Response): Promise<void> {
  const input = Validate.commentEdit(req.body)
  await Service.update(input, req.params.id)
  res.sendStatus(204)
}

export async function readComment(req: Request, res: Response): Promise<void> {
  const comment = await Service.read(req.params.id)
  res.status(200).json(comment)
}

export async function deleteComment(req: Request, res: Response): Promise<void> {
  await Service.remove(req.params.id)
  res.sendStatus(204)
}

export async function likeComment(req: Request, res: Response): Promise<void> {
  const input = Validate.likeSubmit(req.body)
  await Service.like(input, req.params.id)
  res.sendStatus(204)
}

export async function unlikeComment(req: Request, res: Response): Promise<void> {
  const input = Validate.likeSubmit(req.body)
  await Service.unlike(input, req.params.id)
  res.sendStatus(204)
}
