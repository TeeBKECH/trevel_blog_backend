export class ApiError extends Error {
  status
  errors

  constructor(status, message, errors = []) {
    super(message)
    this.status = status
    this.errors = errors
  }

  static BadRequestError(message, errors) {
    return new ApiError(400, message, errors)
  }

  static UnauthorizedError() {
    return new ApiError(401, 'Пользователь не авторизован')
  }

  static AccessDenied(errors) {
    return new ApiError(403, 'Нет доступа!', errors)
  }

  static NotFoundError(message, errors) {
    return new ApiError(404, message, errors)
  }
}
