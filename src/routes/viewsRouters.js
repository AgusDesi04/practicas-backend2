import { Router } from "express";

const viewsRouter = Router()

viewsRouter.get('/', (req, res)=>{
  res.render('login')
})

viewsRouter.get('/register', (req, res)=>{
  res.render('register')
})

viewsRouter.get('/errorRegister', (req, res)=>{
  res.render('errorRegister')
})

viewsRouter.get('/errorLogin', (req, res)=>{
  res.render('errorLogin')
})

viewsRouter.get('/profile', (req, res)=>{
  res.render('profile')
  console.log(req.session)
})

export default viewsRouter