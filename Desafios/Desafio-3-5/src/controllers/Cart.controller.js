import { findCartById, createCart, deleteProducts, updateProductsCart } from '../services/cartService.js'
import { findProductById } from '../services/productService.js'

export const postCart = async (req, res) => {  //Insert a new cart
  try {
    const response = await createCart();   
    res.status(200).json(response); 
    
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
      res.status(200).json(cart)
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
    let answer = await deleteProducts(cid)
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
    let answer =  await updateProductsCart(cid, products)
    res.status(200).json(answer)
  
  } catch (error) {
    res.status(500).json({
      message : error.message      
    })
  }
}

export const addProductInCart = async (req, res) => {  //Inserta nuevos producto al carrito especificado
  const cid = req.params.cid
  const pid = req.params.pid

  try {
      const product = await findProductById(pid)
            
      if (product) {
        let cart = await findCartById(cid)
            cart = await cart.populate('products.productId')

        const existProduct = cart.products.find(element => element.productId.id === pid)
        
        if (!existProduct) {
          cart.products.push({productId:pid})          
        } else {
          cart.products = cart.products.map((element) =>
          { 
            if (element.productId.id === pid) {
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

export const putQuantityProduct = async (req, res) => {  //Modifica cantidades de un producto
  const cid = req.params.cid
  const pid = req.params.pid
  const { quantity } = req.body

  try {
      let cart = await findCartById(cid)
          cart = await cart.populate('products.productId')
      const existProduct = cart.products.find(element => element.productId.id === pid)
    
      if (existProduct) {
        cart.products = cart.products.map((element)=>
        { 
          if ( element.productId.id === pid) {
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

export const deleteProductCart = async (req, res) => {  //Elimina productos del carrito especificado
  const cid = req.params.cid
  const pid = req.params.pid

  try {
      
      let cart = await findCartById(cid)
      cart = await cart.populate('products.productId')

      const filteredCart = cart.products.filter((element)=> {return element.productId.id!==pid})        
      if (filteredCart.length !== cart.products.length) {      
        cart.products = filteredCart
        await cart.save()
        res.status(200).json(cart)
      } else {
        res.status(200).send("Product dont exist in cart")
      }    
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}