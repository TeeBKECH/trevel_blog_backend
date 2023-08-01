import { Router } from 'express'

import * as userController from '../controllers/user-controller.js'
import roleMiddleware from '../middleware/role-middleware.js'

const router = new Router()

// API Получения, добавления, удаления и обновления пользователей
router.post('/', roleMiddleware(['SUPER_ADMIN']), userController.addUser)
router.patch('/:id', roleMiddleware(['SUPER_ADMIN']), userController.updateUser)
router.delete('/:id', roleMiddleware(['SUPER_ADMIN']), userController.deleteUser)
router.get('/', roleMiddleware(['SUPER_ADMIN']), userController.getUsers)
router.get('/:id', userController.getUser)

export default router
