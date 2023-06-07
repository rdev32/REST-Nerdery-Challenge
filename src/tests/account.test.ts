import * as accountsService from '../services/accounts.service'
import { BadRequest, NotFound, Unauthorized, Conflict, InternalServerError } from 'http-errors'
import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'
import { ValidationResult } from 'joi'
import 'dotenv/config'

const prisma = new PrismaClient()

jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn(() => ({
    user: {
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn()
    },
    token: {
      create: jest.fn()
    }
  }))
}))

describe('Accounts tests', () => {
  describe('update', () => {
    afterEach(() => {
      jest.clearAllMocks()
    })

    test('throws BadRequest error for invalid input', async () => {
      const input = {
        value: null,
        error: new Error('Validation error')
      } as ValidationResult

      await expect(accountsService.update(input)).rejects.toThrow(BadRequest)
      await expect(accountsService.update(input)).rejects.toThrow('Error validating the body')
    })

    test('throws NotFound error if user is not found', async () => {
      const input = {
        value: {
          id: faker.string.uuid()
        },
        error: null
      } as ValidationResult

      const mockedFindUnique = prisma.user.findUnique as jest.MockedFunction<
        typeof prisma.user.findUnique
      >

      mockedFindUnique.mockResolvedValueOnce(null)

      await expect(accountsService.update(input)).rejects.toThrow(NotFound)
      await expect(accountsService.update(input)).rejects.toThrow('User not found')
    })
  })

  describe('remove', () => {
    afterEach(() => {
      jest.clearAllMocks()
    })

    test('throws NotFound error for non-existing user', async () => {
      const userId = 'non-existent-id'

      const mockedFindUnique = prisma.user.findUnique as jest.MockedFunction<
        typeof prisma.user.findUnique
      >

      mockedFindUnique.mockResolvedValueOnce(null)

      await expect(accountsService.remove(userId)).rejects.toThrow(NotFound)
      await expect(accountsService.remove(userId)).rejects.toThrow('User not found')
    })
  })

  describe('login', () => {
    it('should throw BadRequest error when missing values are provided', async () => {
      const input = {
        value: {
          email: '',
          password: ''
        },
        error: 'Missing values in submit'
      } as ValidationResult

      await expect(accountsService.login(input)).rejects.toThrow(BadRequest)
    })

    it('should throw NotFound error when user is not found', async () => {
      const input = {
        value: {
          email: 'example@example.com',
          password: 'password123'
        },
        error: null
      }

      jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(null)
      await expect(accountsService.login(input)).rejects.toThrow(NotFound)
    })
  })

  describe('logout', () => {
    it('should throw Unauthorized error when no token is provided', async () => {
      const token = ''

      await expect(accountsService.logout(token)).rejects.toThrow(Unauthorized)
    })
  })

  describe('register', () => {
    it('should throw BadRequest error when invalid input is provided', async () => {
      const input = {
        value: null,
        error: 'Invalid submit'
      } as ValidationResult

      await expect(accountsService.register(input)).rejects.toThrow(BadRequest)
    })
  })
})
