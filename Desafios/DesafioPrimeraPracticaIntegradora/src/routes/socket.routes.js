import { Router } from "express"
import { getManagerMessages } from "../dao/daoManager.js"
import { managerProduct } from "../controllers/product.controller.js"

const routerSocket = Router()

const data = await getManagerMessages()
const msgManager = new data.ManagerMessageMongoDB

routerSocket.get('/', async (req, res) => {
  let { limit } = req.query
  let products
  !limit
    ? products = await managerProduct.getElements(0)
    : products = await managerProduct.getElements(limit)
  res.render("index", { products })
})

routerSocket.get("/realtimeproducts", async (req,res) => {
  const products = await managerProduct.getElements(0)
  res.render("realTimeProducts", { products: products })
})

routerSocket.get("/chat", async (req, res) => {
  const messages = await msgManager.getElements(0)
  res.render("chat", { messages: messages})
})

export default routerSocket