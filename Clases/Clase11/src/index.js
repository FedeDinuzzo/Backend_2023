import express from 'express'
import { __dirname } from './path.js'
import routerProduct from './routes/productos.routes.js'
import routerCart from './routes/cart.routes.js'
import multer from 'multer'
import { engine } from 'express-handlebars'
import * as path from 'path'
// Importamos
import { Server } from 'socket.io'

// Setting multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/public/img")
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`)
  }
})

const upload = multer({storage: storage})

const app = express()
const PORT = 4000

// Ejecutamos el servidor
const server = app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`)
})

// Middlewares
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', path.resolve(__dirname, './views'))

// ServerIO o io
const io = new Server(server)

// io.on establecer la conexion
io.on("connection", (socket) => {
  console.log("Client connected")
  // socket.on recibo info del cliente
  socket.on("mensaje", info => {
    console.log(info)
  })
})

// Routes
app.use('/static', express.static(__dirname + '/public'))
app.use('/api/products', routerProduct)
app.use('/api/carts', routerCart)

// Multer Image Route
app.post('/upload', upload.single('product'), (req, res) => {
  console.log(req.file)
  res.send("Image charged")
})

// HBS
app.get('/', (req, res) => {
  const user = {
    nombre: "Federico",
    email: "fede@gmail.com",
    rol: "Tutor"
  }

  const cursos = [
    {numero: 123, dia: "LyM", horario: "Noche"},
    {numero: 456, dia: "MyJ", horario: "Tarde"},
    {numero: 789, dia: "S", horario: "Mañana"}
  ]
  
  res.render("home", {// Renderizar el siguiente contenido
    titulo: "Ecommerce Backend",
    mensaje: "Pepe",
    usuario: user,
    // Logica de js como boolean al home.handlebrs
    isTutor: user.rol === "Tutor",
    cursos
  })
})