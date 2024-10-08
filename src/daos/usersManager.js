import { UserModel } from "./models/userModel.js";

export default class usersManager {

  static async existsUser(email) {
    try {
      return await UserModel.findOne({ email })
    } catch (error) {
      throw new Error(error)
    }
  }

  static async register(user) {
    try {

      const { email } = user
      const existsUser = await this.existsUser(email)

      if (!existsUser) {
        return await UserModel.create(user)
      } else {
        return null
      }

    } catch (error) {
      throw new Error(error)
    }
  }

  static async login(email, password) {
    try {
      return await UserModel.findOne({email, password})
    } catch (error) {
      throw new Error(error)
    }
  }

}