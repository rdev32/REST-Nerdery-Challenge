import { Router } from 'express'
import asyncHandler from 'express-async-handler'
import * as commentsController from '../controllers/comments.controller'
import * as auth from '../middlewares/auth.middleware'

const router = Router()

router.get(
  '/comments/:id', 
  asyncHandler(commentsController.readComment)
)
router.post(
  '/comments/',
  auth.protect,
  auth.authorize,
  asyncHandler(commentsController.createComment)
)
router.put(
  '/comments/:id',
  auth.protect,
  auth.authorize,
  asyncHandler(commentsController.updateComment)
)
router.put(
  '/posts/like/:id', 
  auth.protect, 
  auth.authorize, 
  asyncHandler(commentsController.likeComment)
)
router.put(
  '/posts/unlike/:id',
  auth.protect,
  auth.authorize,
  asyncHandler(commentsController.unlikeComment)
)
router.delete(
  '/comments/:id',
  auth.protect,
  auth.authorize,
  asyncHandler(commentsController.deleteComment)
)
export default router
