import * as authService from '../services/auth-service.js'

export const registration = async (req, res, next) => {
  try {
    const { email, password, nickName } = req.body
    const data = await authService.registration(email, password, nickName)
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

export const getMe = async (req, res, next) => {
  try {
    const { user } = req
    const userData = await authService.getMe(user.id)
    return res.json(userData)
  } catch (error) {
    next(error)
  }
}

export const logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies
    await authService.logout(refreshToken)
    return res
      .status(200)
      .clearCookie('refreshToken')
      .json({ message: 'Вы успешно вышли из учетной записи' })
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
