import { getManagerCart } from "../dao/daoManager.js"

const data = await getManagerCart()
const managerCart = new data.ManagerCartMongoDB

export const createCart = async (req, res) => {
  try {
    const cart = await managerCart.addElements()
    return res.status(200).json(cart)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getProductsCart = async (req, res) => {
  try {
    const cid = req.params.cid   
    const cart = await managerCart.getElementById(cid).populate('products.productId')
    if (cart.products.length !== 0 ){
      res.status(200).json(cart)
    } else {
      res.status(200).json("Cart empty");      
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const addProductCart = async (req, res) => {
  const cid = req.params.cid
  const pid = req.params.pid
  try {
    const cart = await managerCart.addProductCart(cid, pid).populate('products.productId')
    res.status(200).json(cart) 
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const updateQuantityProduct = async (req, res) => {
  const cid = req.params.cid
  const pid = req.params.pid
  const { quantity } = req.body
  try {
    const product =  await managerCart.changeQuantity(cid, pid, quantity).populate('products.productId')
    if (product) {
      return res.status(200).json({ message: "Product updated" })
    }
    res.status(200).json({ message: "Product not found" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const updateCart = async (req, res) => {
  const cid = req.params.cid
  const products = req.body
  try{ 
    const message = await managerCart.changeAllCart(cid, products)
    if (message) {
      return res.status(200).json({ message: "Cart Updated" })
    } 
    res.status(200).json({ message: "Cannot Update Cart" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const deleteProductCart = async (req, res) => {
  try {
    const cid = req.params.cid
    const pid = req.params.pid
    let prod = await managerCart.deleteProductCart(cid,pid).populate('products.productId')
    res.status(200).json(prod ? prod : "product not found" )
  
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

export const deleteProductsCart = async (req, res) => {
  try {
    const cid = req.params.cid
    let products = await managerCart.deleteProductsCart(cid)
    if (products) {
      res.status(200).json({ message: "Cart empty, products deleted" })
    }
  } catch (error) {
    res.status(500).json({ message : error.message })   
  }
}
