import express from "express"
import { connDB } from "./config/db.connections.js"
import { errorHandler } from "./middlewares/errorHandler.js"
import cookieParser from "cookie-parser"
import { __dirname } from "./utils.js"
import MongoStore from "connect-mongo"
import session from "express-session"
import handlebars from 'express-handlebars'
import usersRouter from "./routes/userRouter.js"
import viewsRouter from "./routes/viewsRouters.js"



const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

// handlebars
app.engine('handlebars', handlebars.engine())
app.set("views", __dirname + "/views")
app.set("view engine", "handlebars")


app.use(errorHandler)

connDB()


app.use('/users', usersRouter)
app.use('/', viewsRouter )

app.listen(8080, () => console.log('server ok en el puerto 8080!'))