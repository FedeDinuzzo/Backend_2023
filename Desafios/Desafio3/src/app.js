import express from 'express'
import ProductManager from './ProductManager.js'

const app = express()
const PORT = 8080
const manager = new ProductManager("./src/products.json");

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.get('/', (req, res) => {
  res.send("Este es el desafio 3")
})

// Reads the products file and returns it in an object
// If you pass a limit by query params it returns that and if not returns all the products
app.get('/products', async (req, res) => {
  try {
    const products = await manager.getProducts()
    const { limit } = req.query
    if (limit) {
      const productsLimit = products.slice(0, parseInt(limit))
      res.send(`This are the products you ordered: ${JSON.stringify(productsLimit)}`)
    } else {
      res.send(`This are all the products: ${JSON.stringify(products)}`)
    }
  } catch {
    console.log(`Something wen't wrong, cannot get products`)
  }
})

// Looks for the product by its id and returns it
app.get('/products/:pid', async (req, res) => {
  try {
    const product = await manager.getProductsById(parseInt(req.params.id))
    res.send(`The product with the id: ${product.id} is: ${JSON.stringify(product)}`)
  } 
  catch {
    res.send("The product doesn't exist")
  }
})

app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`)
})
