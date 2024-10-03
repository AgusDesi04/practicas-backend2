import { UserModel } from "../models/userModel";

export default class usersManager{

  static async getAllUsers(){
    try {
      const users = await UserModel.find()
      return users
    } catch (error) {
      throw new Error(error)
    }
  }

  static async getUsersById(userId){
    try {
      const user = await UserModel.findById(userId)
      return user
    } catch (error) {
      throw new Error(error)
    }
  }

  static async addUser(user = {}){
      try {
        const newUser = UserModel.create(user)
        return newUser
      } catch (error) {
        throw new Error(error)

      }
  }

}