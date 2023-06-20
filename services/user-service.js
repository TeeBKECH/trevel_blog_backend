import bcrypt from 'bcrypt'
import { v4 } from 'uuid'
import mongoose from 'mongoose'

import UserModel from '../models/user-model.js'

import { sendActivationMail } from './mail-service.js'
import * as tokenService from './token-service.js'
import * as roleService from './role-service.js'

import { UserDto } from '../dtos/user-dto.js'
import { ApiError } from '../utils/api-error.js'

export const getUsers = async () => {
  const users = await UserModel.find()
  return users
}

export const getOneUser = async (id) => {
  const user = await UserModel.findById(id)
  return user
}

export const addUser = async ({ email, password, firstName, lastName, phoneNumber, roles }) => {
  const candidate = await UserModel.findOne({ email })
  if (candidate) {
    throw ApiError.BadRequestError(`Пользователь с адресом ${email} уже существует`)
  }

  const hashPassword = await bcrypt.hash(password, 4)
  const activationLink = v4()

  const user = await UserModel.create({
    email,
    password: hashPassword,
    firstName,
    lastName,
    phoneNumber,
    activationLink,
    roles,
  })

  await roleService.updateRoles(roles, user._id)

  const cart = await cartService.generateCart(user._id)

  user.cart = cart._id
  await user.save()

  const userDto = new UserDto(user)
  await sendActivationMail(email, `${process.env.API_URL}/auth/activate/${activationLink}`)

  const tokens = await tokenService.generateTokens({ ...userDto })
  await tokenService.saveTokens(userDto.id, tokens.refreshToken)

  return {
    ...tokens,
    user: userDto,
  }
}

export const updateUser = async (userData, id) => {
  const user = await UserModel.findOneAndUpdate({ _id: id }, { ...userData })

  const userDto = new UserDto(user)

  const { roles } = userData
  await roleService.updateRoles(roles, userDto.id)

  return {
    user: userDto,
  }
}

export const deleteUser = async (id) => {
  const user = await UserModel.findOneAndDelete({ _id: id })

  const roles = []
  await roleService.updateRoles(roles, id)
  await cartService.deleteCart(id)
  await tokenService.deleteToken(id)

  return user
}
