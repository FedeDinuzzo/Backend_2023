import { Router } from "express"
import { getManagerCart, getManagerProducts } from "../dao/daoManager.js"

const routerCart = Router()

const cartManagerData = await getManagerCart()
const cartManager = new cartManagerData()

const prodManagerData = await getManagerProducts()
const prodManager = new prodManagerData()

// Create new Cart
routerCart.post('/', async (req, res) => {
  const cart = {}
  const newCart = await cartManager.addElements(cart)
  res.send(newCart)
})

// Get cart by id
routerCart.get('/:cid', async (req, res) => { 
  const cart = await cartManager.getElementById(req.params.cid)
  res.send(cart)
})

// Add a product to Cart
routerCart.post("/:cid/products/:pid", async (req, res) => {  
  const cart = await cartManager.addProductToCart(req.params.cid,req.params.pid)
  res.send(cart === true ? "Product added to cart" : cart)
})

routerCart.delete('/:cid', async (req, res) => {
  let cartId = await cartManager.deleteElement(req.params.cid) 
  res.send(`The following cart has been deleted: ${cartId} `)
})

routerCart.delete('/:cid/product/:pid', async (req, res) => { 
  const cartData = await cartManager.getCartById(parseInt(req.params.cid))
  if (cartData) {
    const data = await cartManager.deleteProductFromCart(parseInt(req.params.cid), parseInt(req.params.pid))
    data ? res.send(`Product ${req.params.pid} deleted from cart.`) : res.send(`Hubo un error al eliminar el producto del carrito.`)
  } else {
    res.send(`El producto ${req.params.pid} no se ha encontrado.`)
  }
})

export default routerCart