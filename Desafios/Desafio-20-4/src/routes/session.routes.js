import { Router } from "express"
import { destroySession, testLogin } from "../controllers/session.controller.js"
import passport from "passport"
import { passportError, roleVerification } from "../utils/errorMessages.js"

const routerSession = Router()

routerSession.post("/login", passport.authenticate('login'), testLogin)
routerSession.get("/logout", destroySession)

routerSession.get("/current", passportError('jwt'), roleVerification(['user']), (req, res) => {
  res.send(req.user)
})

export default routerSession