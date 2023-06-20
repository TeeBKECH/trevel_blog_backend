import RoleModel from '../models/role-model.js'

export const addRole = async (value) => {
  const role = await RoleModel.create({ users: [], value })

  return role
}

export const updateRoles = async (roleValues, userId) => {
  const roles = await RoleModel.find()

  if (roles.length === 0) {
    roleValues.forEach(async (value) => {
      await RoleModel.create({ users: [userId], value })
    })
  }

  for (const role of roles) {
    role.users = role.users.map((id) => id.toString()).filter((id) => id !== userId.toString())
    await role.save()

    roleValues.forEach(async (value) => {
      if (value === role.value) {
        role.users = [...role.users, userId]
        await role.save()
      }
    })
  }

  return roles
}
