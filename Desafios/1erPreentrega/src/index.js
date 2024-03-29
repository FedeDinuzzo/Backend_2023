import express from 'express'
import { __dirname } from './path.js'
import routerProduct from './routes/products.routes.js'
import routerCart from './routes/cart.routes.js'
import multer from 'multer'

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
const PORT = 8080

// Middlewares
app.use(express.urlencoded({extended:true}))
app.use(express.json())

// Routes
app.use('/static', express.static(__dirname + '/public'))
app.use('/api/products', routerProduct)
app.use('/api/carts', routerCart)

// Multer Image Route
app.post('/upload', upload.single('product'), (req, res) => {
  console.log(req.file)
  res.send("Image uploaded successfully")
})

app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`)
})