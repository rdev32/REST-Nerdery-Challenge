import joi from 'joi'
import { User, Post, Comment, Like } from '@prisma/client'

interface LoginBody {
  email: string
  password: string
}

export function userEdit(user: User) {
  const userSchema = joi.object<User>({
    id: joi.string().uuid(),
    email: joi.string().email(),
    password: joi.string().min(8).max(16),
    nickname: joi.string().max(8),
    createdAt: joi.date(),
    firstname: joi.string().min(3).max(16),
    lastname: joi.string().min(3).max(16),
    verified: joi.boolean(),
    emailPublic: joi.boolean(),
    namePublic: joi.boolean()
  })

  return userSchema.validate(user)
}

export function loginSubmit(login: LoginBody) {
  const loginSchema = joi.object<LoginBody>({
    email: joi.string().email().required(),
    password: joi.string().min(8).max(16).required()
  })

  return loginSchema.validate(login)
}

export function register(user: User) {
  const userSchema = joi.object<User>({
    id: joi.string().uuid(),
    email: joi.string().required(),
    password: joi.string().min(8).max(16).required(),
    nickname: joi.string().max(8).required(),
    createdAt: joi.date(),
    firstname: joi.string().min(3).max(16).required(),
    lastname: joi.string().min(3).max(16).required(),
    verified: joi.boolean(),
    emailPublic: joi.boolean(),
    namePublic: joi.boolean()
  })

  return userSchema.validate(user)
}

export function postSubmit(post: Post) {
  const postSchema = joi.object<Post>({
    id: joi.string().uuid(),
    title: joi.string().min(12).max(36).required(),
    content: joi.string().min(300).max(8000).required(),
    assets: joi.array(),
    isDraft: joi.boolean(),
    likeCount: joi.number(),
    createdAt: joi.date(),
    updatedAt: joi.date().allow(null),
    userId: joi.string().uuid().required()
  })

  return postSchema.validate(post)
}

export function postEdit(post: Post) {
  const postSchema = joi.object<Post>({
    id: joi.string().uuid(),
    title: joi.string().min(12).max(36),
    content: joi.string().min(300).max(8000),
    assets: joi.array(),
    isDraft: joi.boolean(),
    likeCount: joi.number(),
    createdAt: joi.date(),
    updatedAt: joi.date().allow(null),
    userId: joi.string().uuid()
  })

  return postSchema.validate(post)
}

export function commentSubmit(comment: Comment) {
  const commentSchema = joi.object<Comment>({
    id: joi.string().uuid(),
    content: joi.string().min(3).max(300).required(),
    assets: joi.array(),
    likeCount: joi.number(),
    isDraft: joi.boolean(),
    createdAt: joi.date(),
    updatedAt: joi.date(),
    userId: joi.string().uuid(),
    postId: joi.string().uuid()
  })

  return commentSchema.validate(comment)
}

export function commentEdit(comment: Comment) {
  const commentSchema = joi.object<Comment>({
    id: joi.string().uuid(),
    content: joi.string().min(3).max(300),
    assets: joi.array(),
    likeCount: joi.number(),
    isDraft: joi.boolean(),
    createdAt: joi.date(),
    updatedAt: joi.date().allow(null),
    userId: joi.string().uuid(),
    postId: joi.string().uuid()
  })

  return commentSchema.validate(comment)
}

export function likeSubmit(like: Like) {
  const likeSchema = joi.object<Like>({
    userId: joi.string().uuid().required(),
    postId: joi.string().uuid(),
    commentId: joi.string().uuid()
  })

  return likeSchema.validate(like)
}
