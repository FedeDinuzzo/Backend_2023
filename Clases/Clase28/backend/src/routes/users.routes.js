import { Router } from 'express'
import { getUsers } from "../controllers/user.controller.js";

const routerUsers = Router()

routerUsers.get('/', getUsers)

export default routerUsers