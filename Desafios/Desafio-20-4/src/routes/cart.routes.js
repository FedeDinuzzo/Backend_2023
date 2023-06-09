import { Router } from "express"
import { getCart, updateCart, insertProductCart, updateQuantityProduct, deleteProductCart, deleteProductsCart } from '../controllers/cart.controller.js'

const routerCart = Router()

routerCart.route("/:cid")
  .get(getCart)
  .delete(deleteProductsCart)
  .put(updateCart)
  
routerCart.route("/:cid/products/:pid")
  .post(insertProductCart)
  .put(updateQuantityProduct)
  .delete(deleteProductCart)

export default routerCart