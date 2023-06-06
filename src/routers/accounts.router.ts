import { Router } from 'express'
import * as accountsController from '../controllers/accounts.controller'
import * as auth from '../middlewares/auth.middleware'
import asyncHandler from 'express-async-handler'

const router = Router()

router.post(
  '/accounts/login', 
  asyncHandler(accountsController.login)
)
router.post(
  '/accounts/logout',
  auth.protect,
  auth.authorize,
  asyncHandler(accountsController.logout)
)
router.post(
  '/accounts/register', 
  asyncHandler(accountsController.register)
)
router.put(
  '/accounts/:id',
  auth.protect,
  auth.authorize,
  asyncHandler(accountsController.modifyAccount)
)
router.put(
  '/accounts/confirmation/', 
  asyncHandler(accountsController.confirmation)
)
router.delete(
  '/accounts/:id',
  auth.protect,
  auth.authorize,
  asyncHandler(accountsController.deleteAccount)
)

export default router
