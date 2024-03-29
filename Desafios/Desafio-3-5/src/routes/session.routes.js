import { Router } from "express"
import { testLogin, destroySession } from "../controllers/session.controller.js"
import { postUser } from '../controllers/user.controller.js'
import { passportMessage } from "../utils/passportMessage.js"
import { passportError } from "../utils/errorMessages.js"
import { roleVerification } from "../utils/rolVerification.js"

// "api/session"
const routerUser = Router()

routerUser.post("/register", passportMessage("register"), postUser)

routerUser.post("/login", passportError('login'), testLogin)

routerUser.get("/logout", destroySession)

routerUser.get("/current", passportError('jwt'), roleVerification(['user']), (req, res) => {
  res.send(req.user)
})

export default routerUser