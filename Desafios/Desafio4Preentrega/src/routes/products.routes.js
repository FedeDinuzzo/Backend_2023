import { Router } from "express";
import { ProductManager } from "../controllers/ProductManager.js";

const routerProduct = Router() // Change app to routerProduct
const manager = new ProductManager('src/models/products.json')

// Reads the products file and returns it in an object
// If you pass a limit by query params it returns that and if not returns all the products
routerProduct.get('/', async (req, res) => {
  try {
    const products = await manager.getProducts()
    const { limit } = req.query
    let productsLimit
    if (!limit) {
      productsLimit = products
      // http://localhost:8080/products?limit=1
      res.send(JSON.stringify(products))
    } else {
      productsLimit = products.slice(0, parseInt(limit))
      res.send(JSON.stringify(productsLimit))
    }
  } catch {
    res.send("Something wen't wrong, cannot get products")
  }
})

// Looks for the product by its id and returns it
routerProduct.get('/:pid', async (req, res) => {
  try {
    console.log(req.params.pid)
    const product = await manager.getProductsById(parseInt(req.params.pid))
    res.send(JSON.stringify(product))
  } catch {
    res.send("The product doesn't exist")
  }
})

routerProduct.post('/', async (req, res) => {
  try {
    const product = await manager.addProduct(parseInt(req.body))
    res.send(product)
  } catch {
    res.send("Something wen't wrong, cannot add the product")
  }
})

routerProduct.delete('/:id', async (req, res) => {
  try {
    const product = await manager.deleteProduct(req.params.id)
    req.send(product)
  } catch {
    res.send("Something wen't wrong, cannot delete the product")
  }
})

routerProduct.put('/:id', async (req, res) => {
  try {
    const product = await manager.updateProduct(req.params.id, req.body)
    req.send(product)
  } catch {
    res.send("Something wen't wrong, cannot update the product")
  }
})

export default routerProduct