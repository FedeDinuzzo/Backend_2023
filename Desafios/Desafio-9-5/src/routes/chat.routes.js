import { Router } from "express"
import { passportMessage } from "../utils/passportMessage.js"
import { roleVerification } from "../utils/rolVerification.js"

const routerChat = Router()

routerChat.get('/', passportMessage('jwt'), roleVerification(['user']), async (req, res) => {  
  res.render("chat")
})

export default routerChat