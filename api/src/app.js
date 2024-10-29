import MongoStore from "connect-mongo"
import cookieParser from "cookie-parser"
import 'dotenv/config'
import express from "express"
import session, { Cookie, Store } from "express-session"
import passport from "passport"
import { Server } from "socket.io"
import { connDB } from "./config/db.connections.js"
import ProductsManager from "./daos/productsManager.js"
import { errorHandler } from "./middlewares/errorHandler.js"
import "./passport/github-strategy.js"
import "./passport/google-strategy.js"
import "./passport/jwt.js"
import "./passport/local-strategy.js"
import cartsRouter from "./routes/carts.router.js"
import productsRouter from "./routes/products.router.js"
import usersRouter from "./routes/userRouter.js"
import { __dirname } from "./utils.js"


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

// passport
app.use(passport.initialize())
app.use(passport.session())

// routes
app.use('/api/users', usersRouter)
app.use("/api/products", productsRouter)
app.use("/api/carts", cartsRouter)

// manejo de errores
app.use(errorHandler)

const server = app.listen(8080, () => console.log('server ok en el puerto 8080!'))

const io = new Server(server)

io.on('connection', (socket) => {
  console.log('Cliente conectado');
  ProductsManager.getProducts().then(products => {
    socket.emit('products', products);
  }).catch(error => {
    console.error('Error fetching products:', error);
    socket.emit('products', []);
  });

  socket.on('createProduct', async (product) => {
    try {

      const existingProduct = await ProductsManager.getProductByCode(product.code);
      if (existingProduct) {
        throw new Error('el codigo de producto ya existe')
      }

      await ProductsManager.addProducts(product);
      const products = await ProductsManager.getProducts();
      io.emit('products', products);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  });

  socket.on('deleteProduct', async (productId) => {
    try {
      await ProductsManager.deleteProducts(productId);
      const products = await ProductsManager.getProducts();
      io.emit('products', products);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  });
});

connDB()