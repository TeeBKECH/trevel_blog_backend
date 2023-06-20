import { Router } from 'express'

import roleMiddleware from '../middleware/role-middleware.js'
import authMiddleware from '../middleware/auth-middleware.js'

import * as roleController from '../controllers/role-controller.js'
import * as postController from '../controllers/post-controller.js'

const router = new Router()

// ============================================================
// API Для Получения, добавления, обновления и удаления поста
router.post(
  '/post',
  roleMiddleware(['SUPER_ADMIN', 'ADMIN', 'MANAGER', 'USER']),
  postController.addPost,
)
router.patch(
  '/post/:id',
  roleMiddleware(['SUPER_ADMIN', 'ADMIN', 'MANAGER', 'USER']),
  postController.updatePost,
)
router.delete(
  '/post/:id',
  roleMiddleware(['SUPER_ADMIN', 'ADMIN', 'MANAGER', 'USER']),
  postController.deletePost,
)
router.get('/posts/:id', postController.getPost)
router.get('/posts', postController.getPosts)

// ============================================================
// API для управления ролями пользователя
router.post('/role', roleMiddleware(['SUPER_ADMIN']), roleController.createRole)

export default router
