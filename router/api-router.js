import { Router } from 'express'

import roleMiddleware from '../middleware/role-middleware.js'

import { postValidator, validatorErrors } from '../utils/validator.js'

import * as postController from '../controllers/post-controller.js'

const router = new Router()

// API Для Получения, добавления, обновления и удаления поста
router.post(
  '/posts',
  postValidator,
  validatorErrors,
  roleMiddleware(['SUPER_ADMIN', 'ADMIN', 'USER']),
  postController.addPost,
)
router.patch(
  '/posts/:id',
  roleMiddleware(['SUPER_ADMIN', 'ADMIN', 'USER']),
  postController.updatePost,
)
router.delete(
  '/posts/:id',
  roleMiddleware(['SUPER_ADMIN', 'ADMIN', 'USER']),
  postController.deletePost,
)
router.get('/posts/:id', postController.getPost)
router.get('/posts', postController.getPosts)

export default router
