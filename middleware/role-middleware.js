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
        return next(ApiError.UnauthorizedError())
      }

      const data = validateToken(token, 'access')
      let hasRole = false
      data.roles.forEach((role) => {
        if (userRoles.includes(role)) {
          hasRole = true
        }
      })

      if (!hasRole) {
        return next(ApiError.AccessDenied())
      }

      if (!data) {
        return next(ApiError.UnauthorizedError())
      }
      req.user = data
      next()
    } catch (e) {
      return next(ApiError.UnauthorizedError())
    }
  }
}
