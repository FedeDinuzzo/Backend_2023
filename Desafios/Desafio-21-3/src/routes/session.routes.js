import { Router } from "express";
import { destroySession, testLogin } from "../controllers/session.controller.js";
// import passport from "passport"
// import { passportError, roleVerification } from "../utils/errorMessages.js"

const routerSession = Router()

// routerUser.post("/login", passport.authenticate('login'), testLogin)
routerSession.post("/login", testLogin)
routerSession.get("/logout", destroySession)

// routerUser.get("/current", passportError('jwt'), roleVerification(['user']), (req, res) => {
//   res.send(req.user)
// })

export default routerSession