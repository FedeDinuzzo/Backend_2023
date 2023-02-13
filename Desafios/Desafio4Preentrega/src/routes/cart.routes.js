import { Router } from "express";
import { CartManager } from "../controllers/CartManager.js";
const routerCart = Router() // Change app to routerCart
const manager = new ProductManager('src/models/products.txt')

routerCart.get('/api/carts', (req, res) => {
  res.send("Ruta carritos")
})

routerCart.post('/:idCart/product/:idProduct', (req, res) => {
  // Consultar los carritos existentes dado un id
})

export default routerCart