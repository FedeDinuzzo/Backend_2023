import { Router } from "express"
import { requireAuth, destroySession } from "../controllers/session.controller.js"
import { productView, cartView, loginView, registerView } from "../controllers/view.controllers.js"

const routerHtmlViews = Router()

routerHtmlViews.get('/', requireAuth, productView)
routerHtmlViews.get('/login', loginView)
routerHtmlViews.get('/register', registerView)
routerHtmlViews.get('/products', requireAuth, productView)
routerHtmlViews.get('/carts/:cid', requireAuth, cartView)
routerHtmlViews.get('/logout', destroySession)

export default routerHtmlViews

