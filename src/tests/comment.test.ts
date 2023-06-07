import * as commentService from '../services/comments.service'
import { PrismaClient, Comment } from '@prisma/client'
import { ValidationResult } from 'joi'

describe('CommentsService', () => {
  beforeAll(() => {
    jest.resetAllMocks()
  })

  describe('create', () => {
    it('should create a new comment', async () => {
      const input = {
        value: {
          content: 'aoindaoinoafnaofnadaowndadnaowdadnadinwdnadnadanwdiaondaodnawdnadawdiadanaodnaoidawdnadandainwdaodnadnadaidnaoidnaodnandnfalnfanfoainfoianowdandoanfoanfoanfoanflanflnawlndilawndlnwalidnlanflinalnfalfnanflanflaf',
          userId: 'b052d4fd-18cd-4d4e-b4b0-222981876a4e'
        }
      } as ValidationResult<Comment>
      expect(await commentService.create(input)).toBe(undefined)
    })
  })

  describe('read', () => {
    it('should read a comment', () => {
      commentService.read('1bed52a5-00c7-4795-b130-47325838fd5b')
    })
  })

  describe('update', () => {
    it('should update a comment', () => {
      commentService.update({
        value: {
          isDraft: true
        }
      } as ValidationResult<Comment>, '1bed52a5-00c7-4795-b130-47325838fd5b')
    })
  })

  describe('remove', () => {
    it('should remove a comment', () => {
      commentService.remove('1bed52a5-00c7-4795-b130-47325838fd5b')
    })
  })
})
