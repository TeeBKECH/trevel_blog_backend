import { Router } from 'express'

import * as authController from '../controllers/auth-controller.js'
import authMiddleware from '../middleware/auth-middleware.js'
import { registerValidator, validatorErrors, loginValidator } from '../utils/validator.js'

const router = new Router()

// API Авторизации / регистрации пользователей
router.post('/registration', registerValidator, validatorErrors, authController.registration)
router.post('/login', loginValidator, validatorErrors, authController.login)
router.get('/me', authMiddleware, authController.getMe)
router.get('/logout', authMiddleware, authController.logout)
router.get('/activate/:link', authController.activate)
router.get('/refresh', authController.refresh)

export default router
