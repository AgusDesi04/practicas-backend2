import usersManager from "../daos/usersManager.js"

import { createHash, isValidPassword } from "../utils.js"


export const getUserByEmail = async (email) => {
  try {
    return await usersManager.existsUser(email)
  } catch (error) {
    throw new Error(error)
  }
}

export const getUserById = async (id) => {
  try {
    return await usersManager.getById(id)
  } catch (error) {
    throw new Error(error)
  }
}



export const register = async (user) => {
  try {
    const { email, password } = user
    const existsUser = await getUserByEmail(email)

    if (!existsUser) {
      return await usersManager.register({
        ...user,
        password: await createHash(password)
      })
    } else {
      return null
    }

  } catch (error) {
    throw new Error(error)
  }
}

export const login = async (email, password) => {
  try {
    const userExists = await getUserByEmail(email)
    if (userExists) {
      const passValid = await isValidPassword(password, userExists)

      if (!passValid) return null
      else return userExists
    }
  } catch (error) {
    throw new Error(error)
  }
}