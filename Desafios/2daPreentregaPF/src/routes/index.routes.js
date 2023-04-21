import { Router } from "express"
import { managerProduct } from "../controllers/product.controller.js"

const routerIndex = Router()

routerIndex.get('/', async (req, res) => {
  let { limit } = req.query
  let products
  !limit
    ? products = await managerProduct.getElements(0)
    : products = await managerProduct.getElements(limit)
  res.render("index", { products })
})

export default routerIndex

