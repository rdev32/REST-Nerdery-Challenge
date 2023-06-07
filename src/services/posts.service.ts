import { PrismaClient, Post, Like } from '@prisma/client'
import { NotFound, BadRequest, Forbidden, Conflict } from 'http-errors'
import { ValidationResult } from 'joi'
import { generatePagination } from '../middlewares/page.middleware'

const prisma = new PrismaClient()

export async function create(submit: ValidationResult<Post>)
: Promise<void> {
  const { value, error } = submit

  if (error) {
    throw new BadRequest('Body attributes missing')
  }

  const search = await prisma.post.findMany({ where: { title: value.title }})

  if (!search) {
    throw new Conflict('Post already exists') 
  }

  await prisma.post.create({ data: value })
}

export async function update(submit: ValidationResult<Post>, postId: string)
: Promise<void> {
  const { value, error } = submit

  if (error) {
    throw new BadRequest('Field in body did not comply requirements')
  }

  const owner = await prisma.user.findUnique({ where: { id: value.userId } })

  if (!owner) {
    throw new Forbidden('Only the owner can edit this post')
  }

  const post = await prisma.post.update({
    where: { id: postId },
    data: value
  })

  if (!post) {
    throw new NotFound('Post not found')
  }
}

export async function read(postId: string): Promise<Post> {
  const post = await prisma.post.findUnique({ where: { id: postId } })

  if (!post) {
    throw new NotFound('Post not found')
  }

  return post
}

export async function readAll(): Promise<Post[]> {
  const posts = await prisma.post.findMany()
  return posts
}

export async function remove(postId: string): Promise<void> {
  const post = await prisma.post.delete({ where: { id: postId } })

  if (!post) {
    throw new NotFound('Post not found')
  }
}

export async function like(submit: ValidationResult<Like>, postId: string)
: Promise<void> {
  const { value, error } = submit

  if (error) {
    throw new BadRequest('Error on submited body')
  }

  const user = await prisma.user.findUnique({ where: { id: value.userId } })

  if (!user) {
    throw new NotFound('User not found')
  }

  const like = await prisma.like.create({
    data: {
      postId: postId,
      userId: value.userId
    }
  })

  if (!like) {
    throw new NotFound('Post not found')
  }

  const { _count } = await prisma.like.aggregate({
    where: {
      userId: user.id
    },
    _count: {
      postId: true
    }
  })

  await prisma.post.update({
    where: { id: postId },
    data: {
      likeCount: _count.postId
    }
  })
}

export async function unlike(submit: ValidationResult<Like>, postId: string)
:Promise<void> {
  const { value, error } = submit

  if (error) {
    throw new BadRequest('Error on submited body')
  }

  const user = await prisma.user.findUnique({ where: { id: value.userId } })

  if (!user) {
    throw new Forbidden('Not the owner')
  }

  await prisma.like.deleteMany({
    where: {
      postId: postId
    }
  })
}
