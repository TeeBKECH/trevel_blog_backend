import { validationResult, body } from 'express-validator'
import { ApiError } from './api-error.js'

export const registerValidator = [
  body('nickName', 'Длина nickname (2-16)').isLength({ min: 2, max: 16 }),
  body('email', 'Некорректный email').isEmail(),
  body('password', 'Длина пароля (7-16)').isLength({ min: 7, max: 16 }),
]

export const loginValidator = [
  body('email', 'Некорректный email').isEmail(),
  body('password', 'Длина пароля (7-16)').isLength({ min: 7, max: 16 }),
]

export const postValidator = [
  body('postData.title', 'Заголовок должен быть строкой')
    .isString()
    .isLength({ min: 3, max: 35 })
    .withMessage('Длина заголовка (3-35)'),
  body('postData.text', 'Поле "Текст" должно быть строкой')
    .isString()
    .isLength({ min: 3, max: 350 })
    .withMessage('Длина текста (3-350)'),
  body('postData.imageUrl', 'Должно быть ссылкой').optional().isURL(),
]

export const validatorErrors = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    throw ApiError.BadRequestError('Ошибка при валидации данных', errors.array())
  }
  next()
}
