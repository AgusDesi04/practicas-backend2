import { Router } from "express";
import passport from "passport";
import { loginResponse, passportResponse, registerResponse } from "../controllers/userControllers.js";
import { isAuth } from "../middlewares/isAuth.js";


const usersRouter = Router()

usersRouter.post('/register', passport.authenticate('register'), registerResponse)

usersRouter.post('/login', passport.authenticate('login'), loginResponse)

usersRouter.get('/private', isAuth, (req, res) => res.send('INFORMACION CONFIDENCIAL'))

usersRouter.get('/register-github', passport.authenticate('github', { scope: ['user:email'] }))

usersRouter.get('/github', passport.authenticate('github', { scope: ['user:email'] }), passportResponse)

usersRouter.get('/oauth2/redirect/accounts.google.com', passport.authenticate('google', { assignProperty: 'user'}), passportResponse)


export default usersRouter
