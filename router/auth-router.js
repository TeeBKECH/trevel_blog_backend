import { Router } from 'express'
import { body } from 'express-validator'

import * as authController from '../controllers/auth-controller.js'
import authMiddleware from '../middleware/auth-middleware.js'

const router = new Router()

// API Авторизации / регистрации пользователей
router.post(
  '/registration',
  body('email').isEmail(),
  body('password').isLength({ min: 7, max: 16 }),
  authController.registration,
)
router.post(
  '/login',
  body('email').isEmail(),
  body('password').isLength({ min: 7, max: 16 }),
  authController.login,
)
router.post('/logout', authController.logout)
router.get('/refresh', authController.refresh)
router.get('/profile', authMiddleware, authController.getMe)
router.get('/activate/:link', authController.activate)

export default router
