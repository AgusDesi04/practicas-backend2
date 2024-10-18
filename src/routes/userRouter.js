import { Router } from "express";
import { loginResponse, registerResponse } from "../controllers/userControllers.js";
import { isAuth } from "../middlewares/isAuth.js";
import passport from "passport";


const usersRouter = Router()

usersRouter.post('/register', passport.authenticate('register'), registerResponse )

usersRouter.post('/login', passport.authenticate('login'),  loginResponse)

usersRouter.get('/private', isAuth, (req, res)=> res.send('INFORMACION CONFIDENCIAL') )


export default usersRouter
