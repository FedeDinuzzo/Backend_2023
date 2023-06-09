import { Router } from "express"
import { productView, cartView } from "../controllers/view.controllers.js"

const routerHtmlViews = Router()

routerHtmlViews.get('/', productView)
routerHtmlViews.get('/products', productView)
routerHtmlViews.get('/carts/:cid', cartView)

export default routerHtmlViews

