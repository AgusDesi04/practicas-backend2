class UserDto {
  constructor(user){
    this.id = user.id
    this.first_name = user.first_name
    this.last_name = user.last_name
    this.email = user.email
    this.role  = user.role
    this.cart = user.cart

  }
}

export default UserDto