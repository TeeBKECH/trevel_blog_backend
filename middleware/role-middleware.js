import { validateToken } from '../services/token-service.js'
import { ApiError } from '../utils/api-error.js'

export default (userRoles) => {
  return (req, res, next) => {
    if (req.method === 'OPTIONS') {
      next()
    }

    try {
      const token = req.headers.authorization.split(' ')[1]
      if (!token) {
        throw ApiError.UnauthorizedError()
      }

      const data = validateToken(token, 'access')

      if (!data) {
        throw ApiError.UnauthorizedError()
      }

      let hasRole = false
      data.roles.forEach((role) => {
        if (userRoles.includes(role)) {
          hasRole = true
        }
      })

      if (!hasRole) {
        throw throwApiError.AccessDenied()
      }

      req.user = data
      next()
    } catch (e) {
      return next(ApiError.UnauthorizedError())
    }
  }
}
