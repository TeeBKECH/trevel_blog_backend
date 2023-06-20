import * as userService from '../services/user-service.js'

export const getUsers = async (req, res, next) => {
  try {
    const users = await userService.getUsers()
    return res.json(users)
  } catch (error) {
    next(error)
  }
}

export const getOneUser = async (req, res, next) => {
  try {
    const { id } = req.params
    const user = await userService.getOneUser(id)
    return res.json(user)
  } catch (error) {
    next(error)
  }
}

export const addUser = async (req, res, next) => {
  try {
    const { email, password, firstName, lastName, phoneNumber, roles } = req.body
    const user = await userService.addUser({
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      roles,
    })
    return res.json(user)
  } catch (error) {
    next(error)
  }
}

export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params
    const { userData } = req.body
    const user = await userService.updateUser(userData, id)
    return res.json(user)
  } catch (error) {
    next(error)
  }
}

export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params
    const user = await userService.deleteUser(id)
    return res.json(user)
  } catch (error) {
    next(error)
  }
}
