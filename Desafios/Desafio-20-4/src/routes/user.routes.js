import { Router } from 'express'
import { getUsers } from "../controllers/user.controller.js"
// import passport from "passport"


// "/api/user"
const routerUser = Router()

// routerUser.post("/register", passport.authenticate('register'), createUser)
routerUser.route("/")
  .get(getUsers)

export default routerUser