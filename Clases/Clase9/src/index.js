import express from 'express'
import routerProduct from "./routes/productos.routes.js"
import { __dirname, __filename } from './path.js'
import multer from 'multer'
import { engine } from 'express-handlebars'
import * as path from 'path'

console.log(__dirname)
console.log(__filename)

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

// Middlewares
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', path.resolve(__dirname, './views'))

// Routes
app.use("/", express.static(__dirname + '/public'))
app.use('/api/products', routerProduct)
app.post('/upload', upload.single('product'), (req, res) => {
  console.log(req.body)
  console.log(req.file)
  res.send("Imagen Cargada")
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

app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`)
})