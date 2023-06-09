import { Router } from "express"
import { getProductsCart, updateCart, addProductCart, updateQuantityProduct, deleteProductCart, deleteProductsCart } from '../controllers/cart.controller.js'

const routerCart = Router()

routerCart.route("/:cid")
  .get(getProductsCart)
  .delete(deleteProductsCart)
  .put(updateCart)
  
routerCart.route("/:cid/products/:pid")
  .post(addProductCart)
  .put(updateQuantityProduct)
  .delete(deleteProductCart)

export default routerCart