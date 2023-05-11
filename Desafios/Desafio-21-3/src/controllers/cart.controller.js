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

    let cart = await managerCart.getElementById(cid)
        cart = await cart.populate('products.productId')

    if (cart.products.length !== 0 ){
      res.status(200).json(cart)
    } else {
      res.status(200).json("Cart empty");      
    }

  } catch (error) {
    res.status(500).json({
      message : error.message
    })   
  }
}

export const addProductCart = async (req, res) => {  //Inserta nuevos producto al carrito especificado
  const cid = req.params.cid
  const pid = req.params.pid

  try {
      const product = await managerCart.getElementById(pid)
            
      if (product) {
        let cart = await managerCart.getElementById(cid)
            cart = await cart.populate('products.productId')

        const existProduct = cart.products.find(element => element.productId.id === pid)
        
        if (!existProduct) {
          cart.products.push({productId:pid})          
        } else {
          cart.products = cart.products.map((element)=>
          { 
            if( element.productId.id===pid){
              element.quantity++
            }             
            return element             
          })        
        }    
        
        
        await cart.save()
        
        res.status(200).json(cart)

      } else {

        throw new Error("Producto no existe")     
      }      
  } catch (error) {
      res.status(500).json({
        message: error.message
      })
  }
}

export const updateQuantityProduct = async (req, res) => {
  const cid = req.params.cid
  const pid = req.params.pid
  const { quantity } = req.body

  try {
    let cart = await managerCart.getElementById(cid)
      cart = await cart.populate('products.productId')
    const existProduct = cart.products.find(element => element.productId.id === pid)
  
    if (existProduct) {
      cart.products = cart.products.map((element)=>
      { 
        if( element.productId.id===pid){
          element.quantity = quantity
        }   
        return element         
      })        
    } else {          
      throw new Error("Product sent dont exist")       
    }
    await cart.save()

    res.status(200).send(cart.products); 

  } catch (error) {
    res.status(500).json({
      message: error.message
    })
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
