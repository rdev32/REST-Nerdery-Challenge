import { Request, Response } from 'express'
import * as Service from '../services/posts.service'
import * as Validate from '../utils/validations'

export async function createPost(req: Request, res: Response): Promise<void> {
  const submit = Validate.postSubmit(req.body)
  await Service.create(submit)
  res.sendStatus(201)
}

export async function updatePost(req: Request, res: Response): Promise<void> {
  const input = Validate.postEdit(req.body)
  await Service.update(input, req.params.id)
  res.sendStatus(204)
}

export async function readPost(req: Request, res: Response): Promise<void> {
  const post = await Service.read(req.params.id)
  res.status(200).json(post)
}

export async function readPosts(req: Request, res: Response): Promise<void> {
  const posts = await Service.readAll()
  res.status(200).json(posts)
}

export async function deletePost(req: Request, res: Response): Promise<void> {
  await Service.remove(req.params.id)
  res.sendStatus(204)
}

export async function likePost(req: Request, res: Response): Promise<void> {
  const submit = Validate.likeSubmit(req.body)
  await Service.like(submit, req.params.id)
  res.sendStatus(204)
}

export async function unlikePost(req: Request, res: Response): Promise<void> {
  const submit = Validate.likeSubmit(req.body)
  await Service.unlike(submit, req.params.id)
  res.sendStatus(204)
}
