import { Router } from "express"

import routerProducts from './products.routes.js'
import routerCart from './cart.routes.js'
import routerIndex from './index.routes.js'
import routerRealTimeProducts from './realTimeProducts.routes.js'
import routerChat from './chat.routes.js'

const router = Router()

router.use('/', routerIndex)
router.use('/api/products', routerProducts)
router.use('/api/carts', routerCart)
router.use('/realTimeProducts', routerRealTimeProducts)
router.use('/chat', routerChat)

export default router