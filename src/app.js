import MongoStore from "connect-mongo"
import cookieParser from "cookie-parser"
import 'dotenv/config'
import express from "express"
import handlebars from 'express-handlebars'
import session, { Cookie, Store } from "express-session"
import { connDB } from "./config/db.connections.js"
import { errorHandler } from "./middlewares/errorHandler.js"
import usersRouter from "./routes/userRouter.js"
import { __dirname } from "./utils.js"
import passport from "passport"
import "./passport/local-strategy.js"



const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())


// Session config

const sessionConfig = {
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60000
  },
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URL,
    dbName: "practicas-backend2",
    ttl: 60,

  })
}

app.use(session(sessionConfig))


app.use(errorHandler)

connDB()

// passport
app.use(passport.initialize())
app.use(passport.session())

// routes
app.use('/users', usersRouter)

app.listen(8080, () => console.log('server ok en el puerto 8080!'))