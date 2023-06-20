import * as roleService from '../services/role-service.js'

export const createRole = async (req, res, next) => {
  try {
    const { value } = req.body
    const roleData = await roleService.addRole(value)
    return res.json(roleData)
  } catch (error) {
    next(error)
  }
}
