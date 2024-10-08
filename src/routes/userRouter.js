import { Router } from "express";
import usersManager from "../daos/usersManager.js";

const usersRouter = Router()

usersRouter.post('/register', async (req, res) => {
  try {
    const newUser = await usersManager.register(req.body)
    if (newUser) {
      res.redirect('/')
    } else {
      res.redirect('/errorRegistro')
    }
  } catch (error) {
    res.json({ message: error.message })
  }
})

usersRouter.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await usersManager.login(email, password)

    if(user){
      req.session.email = email
      // req.session.password = password
      res.redirect('/perfil')
    }else{
      res.redirect('/errorLogin')
    }

  } catch (error) {
    res.json({ message: error.message })
  }
})


export default usersRouter
