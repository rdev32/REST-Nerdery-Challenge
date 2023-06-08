import { PrismaClient, Like, Comment } from '@prisma/client'
import { NotFound, BadRequest, InternalServerError, Forbidden } from 'http-errors'
import { ValidationResult } from 'joi'

const prisma = new PrismaClient()

export async function read(commentId: string) {
  const comment = await prisma.comment.findUnique({ where: { id: commentId } })

  if (!comment) {
    throw new NotFound('Comment not found')
  }

  return comment
}

export async function remove(commentId: string) {
  const comment = await prisma.comment.findUnique({ where: { id: commentId } })

  if (!comment) {
    throw new NotFound('Comment not found')
  }

  await prisma.comment.delete({ where: { id: comment.id } })
}

export async function update(input: ValidationResult<Comment>, commentId: string) {
  const { value, error } = input

  if (error) {
    throw new BadRequest('Error on submited body')
  }

  const comment = await prisma.comment.findUnique({ where: { id: commentId } })
  if (!comment) {
    throw new NotFound('Comment not found')
  }

  const update = await prisma.comment.update({
    where: { id: commentId },
    data: value
  })

  if (!update) {
    throw new InternalServerError('Server error')
  }
}

export async function create(input: ValidationResult<Comment>) {
  const { value, error } = input

  if (error) {
    throw new BadRequest('Error on submited body')
  }

  const comment = await prisma.comment.create({
    data: value
  })

  if (!comment) {
    throw new InternalServerError('Server error')
  }
}

export async function like(submit: ValidationResult<Like>, commentId: string) {
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
      commentId: commentId,
      userId: value.userId
    }
  })

  if (!like) {
    throw new InternalServerError('Server error')
  }

  const comment = await prisma.comment.findFirst({ where: { userId: user.id } })

  if (!comment) {
    throw new NotFound('Post not found')
  }

  const { _count } = await prisma.like.aggregate({
    where: {
      userId: user.id
    },
    _count: {
      commentId: true
    }
  })

  await prisma.post.update({
    where: { id: comment.id },
    data: {
      likeCount: _count.commentId
    }
  })
}

export async function unlike(submit: ValidationResult<Like>, commentId: string) {
  const { value, error } = submit

  if (error) {
    throw new BadRequest('Error on submited body')
  }

  const user = await prisma.user.findUnique({ where: { id: value.userId } })

  if (!user) {
    throw new Forbidden('Not the owner')
  }

  const like = await prisma.like.deleteMany({
    where: {
      commentId: commentId
    }
  })

  if (!like) {
    throw new InternalServerError('Server error')
  }
}
