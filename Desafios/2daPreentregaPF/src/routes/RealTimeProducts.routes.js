import { Router } from "express"
import { managerProduct } from "../controllers/product.controller.js"

const routerRealTimeProducts = Router()

routerRealTimeProducts.get("/realtimeproducts", async (req,res) => {
  const products = await managerProduct.getElements(0)
  res.render("realTimeProducts", { products: products })
})

export default routerRealTimeProducts