export class UserDto {
  id
  email
  roles

  constructor(model) {
    this.id = model._id
    this.email = model.email
    this.roles = model.roles
  }
}
