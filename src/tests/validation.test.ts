import {
  userEdit,
  loginSubmit,
  register,
  postSubmit,
  postEdit,
  commentSubmit,
  commentEdit,
  likeSubmit
} from '../utils/validations'
import { User, Post, Comment, Like } from '@prisma/client'
import { faker } from '@faker-js/faker'

describe('Validation tests', () => {
  const fakeUser = {
    id: faker.string.uuid(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    nickname: faker.string.alphanumeric(8),
    createdAt: faker.date.recent(),
    firstname: faker.person.firstName(),
    lastname: faker.person.lastName(),
    verified: faker.datatype.boolean(),
    emailPublic: faker.datatype.boolean(),
    namePublic: faker.datatype.boolean()
  } as User

  const fakeLogin = {
    email: faker.internet.email(),
    password: faker.internet.password()
  }

  const fakePost = {
    id: faker.string.uuid(),
    title: faker.lorem.words(3),
    content: faker.lorem.paragraphs(5),
    assets: [],
    isDraft: faker.datatype.boolean(),
    likeCount: faker.number.int(),
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
    userId: faker.string.uuid()
  } as Post

  const fakeComment = {
    id: faker.string.uuid(),
    content: faker.lorem.words(10),
    assets: [],
    likeCount: faker.number.int(),
    isDraft: faker.datatype.boolean(),
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
    userId: faker.string.uuid(),
    postId: faker.string.uuid()
  } as Comment

  const fakeLikePost = {
    postId: faker.string.uuid(),
    userId: faker.string.uuid()
  } as Like

  const fakeLikeComment = {
    userId: faker.string.uuid(),
    commentId: faker.string.uuid()
  } as Like

  describe('Test user edit validation', () => {
    test('Should be a valid user edit ', () => {
      const { error } = userEdit(fakeUser)
      expect(error).toBeUndefined()
    })
  })

  describe('Test login validation', () => {
    test('Should be a valid login', () => {
      const { error } = loginSubmit(fakeLogin)
      expect(error).toBeUndefined()
    })
  })

  describe('Test register validation', () => {
    test('Should be a valid user register', () => {
      const { error } = register(fakeUser)
      expect(error).toBeUndefined()
    })
  })

  describe('Test post submit validation', () => {
    test('Should be a valid post submit', () => {
      const { error } = postSubmit(fakePost)
      expect(error).toBeUndefined()
    })
  })

  describe('Test post edit validation', () => {
    test('Should be a valid edit', () => {
      const { error } = postEdit(fakePost)
      expect(error).toBeUndefined()
    })
  })

  describe('Test comment submit validation', () => {
    test('Should be a valid comment', () => {
      const { error } = commentSubmit(fakeComment)
      expect(error).toBeUndefined()
    })
  })

  describe('Test comment edit validation', () => {
    test('Should be a valid comment', () => {
      const { error } = commentEdit(fakeComment)
      expect(error).toBeUndefined()
    })
  })

  describe('Test post like submit validation', () => {
    test('Should be a valid like for post', () => {
      const { error } = likeSubmit(fakeLikePost)
      expect(error).toBeUndefined()
    })
  })

  describe('Test comment like submit validation', () => {
    test('Should be a valid like for comment', () => {
      const { error } = likeSubmit(fakeLikeComment)
      expect(error).toBeUndefined()
    })
  })
})
