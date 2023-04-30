import { Router } from "express"

import routerProducts from './products.routes.js'
import routerCart from './cart.routes.js'
import routerHtmlViews from './htmlViews.routes.js'
import routerRealTimeProducts from './realTimeProducts.routes.js'
import routerChat from './chat.routes.js'

const router = Router()

router.use('/', routerHtmlViews)
router.use('/api/products', routerProducts)
router.use('/api/carts', routerCart)
router.use('/realTimeProducts', routerRealTimeProducts)
router.use('/chat', routerChat)

export default router