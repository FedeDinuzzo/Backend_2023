import { Router } from "express"
import { CartManager } from "../controllers/CartManager.js"
import { ProductManager } from "../controllers/ProductManager"

const routerCart = Router() // Change app to routerCart
const cartManager = new CartManager('src/models/carts.json')
const productManager = new ProductManager('src/models/products.json')

routerCart.get('/:cid', async (req, res) => {
  try {
    const cart = await cartManager.getCartById(parseInt(req.params.cid))
    res.send(cart)
  } catch {
    res.send("Something wen't wrong, cannot get cart")
  }
})

routerCart.post('/:idCart/product/:idProduct', async (req, res) => {
  // Consultar los carritos existentes dado un id
})

export default routerCart