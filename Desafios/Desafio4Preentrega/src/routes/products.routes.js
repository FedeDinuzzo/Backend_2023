import { Router } from "express";
import { ProductManager } from "../controllers/ProductManager.js";

const routerProduct = Router() // Change app to routerProduct
const manager = new ProductManager('src/models/products.txt')

// Reads the products file and returns it in an object
// If you pass a limit by query params it returns that and if not returns all the products
routerProduct.get('/api/products', async (req, res) => {
  try {
    const products = await manager.getProducts()
    const { limit } = req.query
    let productsLimit
    if (!limit) {
      productsLimit = products
      // http://localhost:8080/products?limit=1
      res.send(products)
    } else {
      productsLimit = products.slice(0, parseInt(limit))
      res.send(productsLimit)
    }
  } catch {
    res.send(`Something wen't wrong, cannot get products`)
  }
})

// Looks for the product by its id and returns it
routerProduct.get('/api/products/:pid', async (req, res) => {
  try {
    console.log(req.params.pid)
    const product = await manager.getProductsById(parseInt(req.params.pid))
    res.send(product)
  } catch {
    res.send("The product doesn't exist")
  }
})

routerProduct.post('/api/products/', async (req, res) => {
  try {
    const product = await manager.addProduct(parseInt(req.body))
    res.send(product)
  } catch {
    res.send("The product doesn't exist")
  }
})

export default routerProduct