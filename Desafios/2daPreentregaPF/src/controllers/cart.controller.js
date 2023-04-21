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
    const products = await managerCart.getProductsCart()
    if (products) {
      return res.status(200).json(products)
    }
    res.status(200).json({
      message: "Products not found"
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const addProductCart = async (req, res) => {
  const cid = req.params.cid
  const pid = req.params.pid
  try {
    const cart = await managerCart.addProductCart(cid, pid)
    res.status(200).json(cart) 
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const updateProductCart = async (req, res) => {
  const { id } = req.params
  const { title, description, code, price, status, stock, category, thumbnails } = req.body
  try {
    const product = await managerCart.updateElement(id, { title: title, description: description, code: code, price: price, status: status, stock: stock, category: category, thumbnails: thumbnails })
    if (product) {
      return res.status(200).json({ message: "Product updated" })
    }
    res.status(200).json({ message: "Product not found" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const deleteProductCart = async (req, res) => {
  try {
    const cid = req.params.cid
    const pid = req.params.pid
    let prod = await managerCart.deleteProductCart(cid,pid);
    res.status(200).json(prod ? prod : "producto no encontrado" ); 
  
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
