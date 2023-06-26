import { Router } from "express"
import { passportMessage } from "../utils/passportMessage.js"
import { roleVerification } from "../utils/rolVerification.js"

const routerChat = Router()

routerChat.get('/', async (req, res) => {  
  res.render("chat")
})

export default routerChat