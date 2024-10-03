import express from "express"
import { connDB } from "./config/db.connections"
import { errorHandler } from "./middlewares/errorHandler"

const app = express()




app.use(errorHandler)

connDB()
app.listen(8080, ()=>console.log('server ok en el puerto 8080!'))