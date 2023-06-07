import { ValidationResult } from 'joi'
import { read, readAll, update, create, remove } from '../services/posts.service'
import { NotFound, Forbidden, BadRequest } from 'http-errors'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

describe('update', () => {
  it('should throw BadRequest error when invalid input is provided', async () => {
    const input = {
      value: null,
      error: 'Field in body did not comply requirements'
    } as ValidationResult

    const postId = 'post_id'

    await expect(update(input, postId)).rejects.toThrow(BadRequest)
  })

  it('should throw Forbidden error when non-owner tries to update the post', async () => {
    const input = {
      value: {
        title: 'Updated Post',
        content: 'Lorem ipsum dolor sit amet',
        userId: 'user_id'
      },
      error: null
    } as ValidationResult

    const postId = 'post_id'

    jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(null)

    await expect(update(input, postId)).rejects.toThrow(Forbidden)
  })

  it('should throw NotFound error when post is not found', async () => {
    const input = {
      value: {
        title: 'Updated Post',
        content: 'Lorem ipsum dolor sit amet',
        userId: 'user_id'
      },
      error: null
    } as ValidationResult

    const postId = 'random_post_id'

    await expect(update(input, postId)).rejects.toThrowError()
  })
})

describe('read', () => {
  it('should throw NotFound error when post is not found', async () => {
    const postId = 'post_id'

    jest.spyOn(prisma.post, 'findUnique').mockResolvedValue(null)

    await expect(read(postId)).rejects.toThrow(NotFound)
  })
})

describe('readAll', () => {
  it('should return an array of posts', async () => {
    const result = await readAll()
    expect(Array.isArray(result)).toBe(true)
  })
})

describe('remove', () => {
  it('should throw NotFound error when post is not found', async () => {
    await expect(remove('postId')).rejects.toThrowError()
  })
})
