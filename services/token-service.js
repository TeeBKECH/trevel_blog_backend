import jwt from 'jsonwebtoken'

import TokenModel from '../models/token-model.js'

export const generateTokens = async (payload) => {
  const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET_KEY, { expiresIn: '1d' })
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET_KEY, { expiresIn: '15d' })
  return { accessToken, refreshToken }
}

export const validateToken = (token, key) => {
  const keys = {
    access: process.env.JWT_ACCESS_SECRET_KEY,
    refresh: process.env.JWT_REFRESH_SECRET_KEY,
  }
  try {
    const data = jwt.verify(token, keys[key])
    return data
  } catch (error) {
    return null
  }
}

export const saveTokens = async (userId, refreshToken) => {
  const tokenData = await TokenModel.findOne({ user: userId })
  if (tokenData) {
    tokenData.refreshToken = refreshToken
    return tokenData.save()
  }
  const token = await TokenModel.create({ user: userId, refreshToken })
  return token
}

export const removeToken = async (token) => {
  const data = await TokenModel.deleteOne({ token })
  return data
}

export const deleteToken = async (id) => {
  const data = await TokenModel.findOneAndDelete({ user: id })
  return data
}

export const findToken = async (refreshToken) => {
  const data = TokenModel.findOne({ refreshToken })
  return data
}
