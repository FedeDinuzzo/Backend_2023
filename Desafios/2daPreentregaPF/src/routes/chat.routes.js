import { Router } from "express"
import { getManagerMessages } from "../dao/daoManager.js"

const routerChat = Router()

const data = await getManagerMessages()
const msgManager = new data.ManagerMessageMongoDB

routerChat.get("/chat", async (req, res) => {
  const messages = await msgManager.getElements(0)
  res.render("chat", { messages: messages})
})

export default routerChat

