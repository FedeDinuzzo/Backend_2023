import { Router } from "express"
import { getProducts, getProduct, createProduct, updateProduct, deleteProduct } from '../controllers/product.controller.js'

const routerProducts = Router()

routerProducts.route("/")
  .post(createProduct)
  .get(getProducts)

  routerProducts.route("/:pid")
  .get(getProduct)
  .put(updateProduct)
  .delete(deleteProduct)

export default routerProducts