import express from 'express'
import { __dirname, __filename } from './path.js'
import routerProduct from './routes/productos.routes.js'
import multer from 'multer'

// Definir el desitno de las images
// Forma basica de usar multer
// const upload = multer({dest:"src/public/img"}) 
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
// Creamos una ruta especial para multer
app.post('/upload', upload.single('product'), (req, res) => {
  console.log(req.body)
  console.log(req.file)
  res.send("Imagen Cargada")
})

// Routes
// Los archivos estaticos son las: imagenes, html, css (publicos)
app.use('/static', express.static(__dirname + '/public'))
app.use('/api/products', routerProduct)

app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`)
})