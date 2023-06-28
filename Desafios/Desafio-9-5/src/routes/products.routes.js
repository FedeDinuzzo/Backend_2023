import { Router } from 'express'
import { getProducts, getProduct, postProduct, putProduct, deleteProductCont } from '../controllers/product.controller.js'
import { passportMessage } from "../utils/passportMessage.js";
import { roleVerification } from "../utils/rolVerification.js"

//"/api/products"
const routerProducts = Router()

routerProducts.route("/")
  .get(getProducts)
  .post(passportMessage('jwt'), roleVerification(['admin']), postProduct)

routerProducts.route("/:pid")
  .get(getProduct)
  .put(passportMessage('jwt'), roleVerification(['admin']), putProduct)
  .delete(passportMessage('jwt'), roleVerification(['admin']), deleteProductCont)

export default routerProducts