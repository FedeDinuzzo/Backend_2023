import { Router } from "express"
import { createCart, getProductsCart, addProductCart, updateProductCart, deleteProductCart, deleteProductsCart } from '../controllers/cart.controller.js'

const routerCart = Router()

routerCart.post("/", createCart)

routerCart.route("/:cid")
  .get(getProductsCart)
  .delete(deleteProductsCart)

routerCart.route("/:cid/products/:pid")
  .post(addProductCart)
  .put(updateProductCart)
  .delete(deleteProductCart)

export default routerCart