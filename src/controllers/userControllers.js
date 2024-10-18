import * as services from '../services/userServices.js'

export const registerResponse = (req, res, next) => {
  try {
    res.json({
      message: 'Register ok!',
      session: req.session

    })
  } catch (error) {
    next(error)
  }
}

export const loginResponse = async (req, res, next) => {
  try {
    const id = req.session.passport.user
    const userDB = await services.getUserById(id)
    const {first_name, last_name, email} = userDB
    res.json({
      message: 'login ok!',
      session: req.session,
      user: {
        first_name,
        last_name,
        email
      }
    })
  } catch (error) {
    next(error)
  }
}

