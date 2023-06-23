import bcrypt from 'bcrypt'
import { v4 } from 'uuid'

import UserModel from '../models/user-model.js'

import { sendActivationMail } from './mail-service.js'
import * as tokenService from './token-service.js'
import * as roleService from './role-service.js'

import { UserDto } from '../dtos/user-dto.js'
import { ApiError } from '../utils/api-error.js'

export const registration = async (email, password) => {
  const candidate = await UserModel.findOne({ email })
  if (candidate) {
    throw ApiError.BadRequestError(`Пользователь с адресом ${email} уже существует`)
  }

  const hashPassword = await bcrypt.hash(password, 4)
  const activationLink = v4()
  const roles =
    email === process.env.SUPER_ADMIN_EMAIL ? ['USER', 'MANAGER', 'ADMIN', 'SUPER_ADMIN'] : ['USER']

  const user = await UserModel.create({
    email,
    password: hashPassword,
    activationLink,
    roles,
  })

  await roleService.updateRoles(roles, user._id)

  await user.save()

  const userDto = new UserDto(user)
  const { password: pass, ...userData } = user._doc
  await sendActivationMail(email, `${process.env.API_URL}/api/auth/activate/${activationLink}`)

  const tokens = await tokenService.generateTokens({ ...userDto })
  await tokenService.saveTokens(userDto.id, tokens.refreshToken)

  return {
    ...tokens,
    user: userData,
  }
}

export const login = async (email, password) => {
  const user = await UserModel.findOne({ email })
  if (!user) {
    throw ApiError.NotFoundError(`Пользователь с адресом ${email} не найден`)
  }

  const isePassEqual = await bcrypt.compare(password, user.password)
  if (!isePassEqual) {
    throw ApiError.BadRequestError('Неверный пароль')
  }

  const userDto = new UserDto(user)
  const { password: pass, ...userData } = user._doc
  const tokens = await tokenService.generateTokens({ ...userDto })
  await tokenService.saveTokens(userDto.id, tokens.refreshToken)

  return {
    ...tokens,
    user: userData,
  }
}

export const logout = async (refreshToken) => {
  const token = await tokenService.removeToken(refreshToken)
  return token
}

export const activate = async (link) => {
  const user = await UserModel.findOne({ activationLink: link })
  if (!user) {
    throw ApiError.BadRequestError('Некорректная ссылка активации')
  }

  user.isActivated = true
  await user.save()
  return user
}

export const refresh = async (refreshToken) => {
  if (!refreshToken) {
    throw ApiError.UnauthorizedError()
  }

  const data = tokenService.validateToken(refreshToken, 'refresh')

  const tokenDb = await tokenService.findToken(refreshToken)
  if (!data || !tokenDb) {
    throw ApiError.UnauthorizedError()
  }

  const user = await UserModel.findById(data.id)
  const userDto = new UserDto(user)
  const { password, ...userData } = user._doc
  const tokens = await tokenService.generateTokens({ ...userDto })
  await tokenService.saveTokens(userDto.id, tokens.refreshToken)

  return {
    ...tokens,
    user: userData,
  }
}

export const getAllUsers = () => {
  const users = UserModel.find()
  return users
}

export const getMe = async (id) => {
  const user = await UserModel.findById(id)
  if (!user) {
    throw ApiError.NotFoundError('Пользователь не найден')
  }
  const { password, ...userData } = user._doc
  return userData
}
