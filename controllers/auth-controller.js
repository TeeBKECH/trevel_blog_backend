import { validationResult } from 'express-validator'

import * as authService from '../services/auth-service.js'
import { ApiError } from '../utils/api-error.js'

export const registration = async (req, res, next) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return next(ApiError.BadRequestError('Ошибка при валидации данных', errors.array()))
    }

    const { email, password, cart } = req.body
    const data = await authService.registration(email, password, cart)
    await res.cookie('refreshToken', data.refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    })
    return res.json(data)
  } catch (error) {
    next(error)
  }
}

export const login = async (req, res, next) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return next(ApiError.BadRequestError('Ошибка при валидации данных', errors.array()))
    }

    const { email, password } = req.body
    const data = await authService.login(email, password)
    await res.cookie('refreshToken', data.refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    })
    return res.json(data)
  } catch (error) {
    next(error)
  }
}

export const logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies
    const data = await authService.logout(refreshToken)
    res.clearCookie('refreshToken')
    return res.status(200).json({ message: 'Вы успешно вышли из учетной записи' })
  } catch (error) {
    next(error)
  }
}

export const activate = async (req, res, next) => {
  try {
    const { link } = req.params
    await authService.activate(link)
    return res.redirect(process.env.CLIENT_URL)
  } catch (error) {
    next(error)
  }
}

export const refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies
    const data = await authService.refresh(refreshToken)
    await res.cookie('refreshToken', data.refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    })
    return res.json(data)
  } catch (error) {
    next(error)
  }
}

export const getUsers = async (req, res, next) => {
  try {
    const users = await authService.getAllUsers()
    return res.json(users)
  } catch (error) {
    next(error)
  }
}

export const getMe = async (req, res, next) => {
  try {
    const { user } = req
    const userData = await authService.getMe(user.id)
    return res.json(userData)
  } catch (error) {
    next(error)
  }
}
