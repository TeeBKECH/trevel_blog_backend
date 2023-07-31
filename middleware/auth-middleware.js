import { ApiError } from '../utils/api-error.js'
import { validateToken } from '../services/token-service.js'

export default (req, res, next) => {
  if (req.method === 'OPTIONS') {
    next()
  }

  try {
    const accessToken = req.headers.authorization.split(' ')[1]

    if (!accessToken) {
      throw ApiError.UnauthorizedError()
    }

    const data = validateToken(accessToken, 'access')
    if (!data) {
      throw ApiError.UnauthorizedError()
    }
    req.user = data
    next()
  } catch (error) {
    return next(ApiError.UnauthorizedError())
  }
}
