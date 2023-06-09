import { getManagerCart } from '../dao/daoManager.js'

const data = await getManagerCart()
export const managerCarts = new data.ManagerCartMongoDB

export const createCart = async (req, res) => {  // Insert a new cart
  try {
    const response = await managerCarts.addElements()

    res.status(200).json(response)
    
  } catch (error) {
    res.status(500).json({
      message : error.message
    })   
  }
}

export const getCart = async (req, res) => { // Retrieves the specified cart
  try {
    const cid = req.params.cid    

    const cart = await managerCarts.getElementById(cid)
    if (cart.products.length !== 0 ){
      res.status(200).json(cart);
    } else {
      res.status(200).json("Cart is empty")   
    }

  } catch (error) {
    res.status(500).json({
      message : error.message
    })   
  }
}

export const deleteProductsCart = async (req, res) => {  // Empty the cart
  try {
    const cid = req.params.cid
    let answer = await managerCarts.deleteProducts(cid);
    res.status(200).json(answer) 
  
  } catch (error) {
    res.status(500).json({
      message : error.message
    })   
  }
}

export const updateCart = async (req, res) => {  // Step on the entire cart with the products sent
  try {
    const cid = req.params.cid
    const products = req.body
    let answer = await managerCarts.changeAllCart(cid, products);
    res.status(200).json(answer);
  
  } catch (error) {
    
    res.status(500).json({
      message : error.message      
    })
  }
}

export const insertProductCart = async (req, res) => {  // Add new products to the specified cart
  try {
    const cid = req.params.cid
    const pid = req.params.pid
      
    const cart = await managerCarts.addProductInCart(cid,pid);

    res.status(200).json(cart)
      
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

export const updateQuantityProduct = async (req, res) => {  // Modify quantities of a product
  try {
      const cid = req.params.cid
      const pid = req.params.pid
      const { quantity } = req.body
      
      let answer = await managerCarts.changeQuantity(cid,pid,quantity);      
      res.status(200).send(answer)
  
    } catch (error) {
      res.status(500).json({
        message: error.message
      })
    }
}

export const deleteProductCart = async (req, res) => {  // Remove products from the specified cart
  try {
    const cid = req.params.cid
    const pid = req.params.pid
    let answer = await managerCarts.deleteProduct(cid,pid)
    res.status(200).json(answer? answer : "product not found" )
  
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}