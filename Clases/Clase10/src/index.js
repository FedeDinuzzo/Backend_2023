import express from "express";
import routerProduct from "./routes/productos.routes.js";
import { __dirname } from "./path.js";
import multer from 'multer'
import { engine } from 'express-handlebars';
import * as path from 'path'
import { Server } from "socket.io";


//const upload = multer({dest:'src/public/img'}) Forma basica de utilizar multer
const storage = multer.diskStorage({
  destination: (req,file, cb) => {
    cb(null, 'src/public/img')
  },
  filename: (req,file,cb) => {
    cb(null, `${file.originalname}`)
  }
})

const upload = multer({storage:storage})

const app = express()
const PORT = 4000 

const server = app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`)
})

//Middlewares
app.use(express.json()) 
app.use(express.urlencoded({extended: true}))
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.resolve(__dirname, './views')); //__dirname + './views'

//ServerIO
const io = new Server(server)

io.on("connection", (socket) => { //io.on es cuando se establece la conexion
  console.log("Cliente conectado")

  socket.on("mensaje", info => { //Cuando recibo informacion de mi cliente
    console.log(info)
  })  

  socket.emit("mensaje-general", [])

  socket.broadcast.emit("mensaje-socket-propio", "Hola, desde mensaje socket propio") //Envio un mensaje a todos los clientes conectados a otros sockets menos al que esta conectado a este socket actualmente
})

//Routes
app.use('/', express.static(__dirname + '/public'))
app.use('/api/products', routerProduct)
app.post('/upload',upload.single('product'), (req,res) => {
    console.log(req.body)
    console.log(req.file)
    res.send("Imagen cargada")
})
//HBS
app.get('/', (req,res) => {
  const user = {
    nombre: "Pablo",
    email: "p@p.com",
    rol: "Tutor"
  }
    const cursos = [
      {numero: 123, dia: "LyM", horario: "Noche"},
      {numero: 456, dia: "MyJ", horario: "Mañana"},
      {numero: 789, dia: "S", horario: "Mañana"}
    ]

    res.render("home", { //Renderizar el siguiente contenido
      titulo: "Ecommerce Backend",
      mensaje: "Pepe",
      usuario: user,
      isTutor: user.rol === "Tutor",
      cursos
    })
})