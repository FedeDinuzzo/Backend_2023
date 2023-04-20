import { Router } from "express"
import { getProducts, getProduct, createProduct, updateProduct, deleteProduct } from '../controllers/product.controller.js'

const routerProduct = Router()

routerProduct.route("/")
  .post(createProduct)
  .get(getProducts)

  routerProduct.route("/:id")
  .get(getProduct)
  .put(updateProduct)
  .delete(deleteProduct)

export default routerProduct