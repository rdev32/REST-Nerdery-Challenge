import { Router } from 'express'
import asyncHandler from 'express-async-handler'
import * as postsController from '../controllers/posts.controller'
import * as auth from '../middlewares/auth.middleware'

const router = Router()

router.get(
  '/posts/', 
  asyncHandler(postsController.readPosts)
)
router.get(
  '/posts/:id', 
  asyncHandler(postsController.readPost)
)
router.post(
  '/posts/', 
  auth.protect, 
  auth.authorize, 
  asyncHandler(postsController.createPost)
)
router.put(
  '/posts/like/:id', 
  auth.protect, 
  auth.authorize, 
  asyncHandler(postsController.likePost)
)
router.put(
  '/posts/unlike/:id', 
  auth.protect, 
  auth.authorize, 
  asyncHandler(postsController.unlikePost)
)
router.put(
  '/posts/:id', 
  auth.protect, 
  auth.authorize, 
  asyncHandler(postsController.updatePost)
)
router.delete(
  '/posts/:id', 
  auth.protect, 
  auth.authorize, 
  asyncHandler(postsController.deletePost)
)

export default router
