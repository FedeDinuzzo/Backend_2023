import { Router } from "express"
import { productView, cartView } from "../controllers/view.controllers.js"

const routerHtmlViews = Router()

routerHtmlViews.get('/', productView)
routerHtmlViews.get('/products', productView)
routerHtmlViews.get('/carts/:cid', cartView)

// routerProductsHtmlViews.get('/', requireAuth, productView)
// routerProductsHtmlViews.get('/login', loginView)
// routerProductsHtmlViews.get('/register', registerView)
// routerProductsHtmlViews.get('/products', requireAuth, productView)
// routerProductsHtmlViews.get('/carts/:cid',requireAuth, cartView )
// routerProductsHtmlViews.get('/logout',destroySession )

export default routerHtmlViews

