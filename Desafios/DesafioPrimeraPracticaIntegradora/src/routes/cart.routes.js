import { Router } from "express"
import { createCart, getProductsCart, addProductCart, updateProductCart, deleteProductCart, deleteProductsCart } from '../controllers/cart.controller.js'

const routerCart = Router()

routerCart.post("/", createCart)

routerCart.route("/:cid")
  .post(addProductCart)
  .get(getProductsCart)
  .delete(deleteProductsCart)

routerCart.route("/:id/products/:id")
  .put(updateProductCart)
  .delete(deleteProductCart)

export default routerCart