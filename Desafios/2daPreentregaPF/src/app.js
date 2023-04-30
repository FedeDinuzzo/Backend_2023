import 'dotenv/config'
import express from 'express'
import * as path from 'path'
import { __dirname } from './path.js'
import { Server } from 'socket.io'
import { engine } from 'express-handlebars'
import { getManagerMessages } from './dao/daoManager.js'
import { managerProduct } from "./controllers/product.controller.js"
import routes from './routes/routes.js'

// Port Server
const app = express()

// Middlewares
app.use(express.json()) 
app.use(express.urlencoded({extended: true}))

// Port
app.set("port", process.env.PORT || 8080)

// Handlebars
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', path.resolve(__dirname, './views')) // __dirname + './views'

// Routes
app.use('/', express.static(__dirname + '/public'))
app.use('/', routes)

const server = app.listen(app.get("port"), () => {
  console.log(`Server on http://localhost:${app.get("port")}`)
})

//ServerIO  
const io = new Server(server)

const data = await getManagerMessages()
const managerMessages = new data.ManagerMessageMongoDB

io.on("connection", async (socket) => {
  console.log("Client connected")
  
  socket.on("message", async (info) => {
    console.log(info)
    await managerMessages.addElements([info])
    const messages = await managerMessages.getElements()
    console.log(messages)
    socket.emit("allMessages", messages)
  })

  socket.on("load messages", async () => {
    const messages = await managerMessages.getElements()
    console.log(messages)
    socket.emit("allMessages", messages)
  })

  socket.on("initial page load", async () => {
    const products = await  managerProduct.getElements()
    console.log(products)
    socket.emit("getProducts", products)
  })

  socket.on("addProduct", async (prod) => {
    await  managerProduct.addElements(prod)
    const products = await  managerProduct.getElements()
    socket.emit("getProducts", products)
  })

  socket.on("deleteProduct", async (prod) => {
    await  managerProduct.deleteElement(prod)
    const products = await  managerProduct.getElements()
    socket.emit("getProducts", products)
  })
})