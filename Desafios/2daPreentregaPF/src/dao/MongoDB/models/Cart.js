import { ManagerMongoDB } from "../../../db/mongoDBManager.js"
import { managerProduct } from "../../../controllers/product.controller.js"
import { Schema } from "mongoose"

const url = process.env.URLMONGODB

const cartSchema = new Schema({
  products: {
    type: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'products'
        },
        quantity: {
          type: Number,
          default: 1
        }
      }
    ],
    default: []
  }
})

export class ManagerCartMongoDB extends ManagerMongoDB {
  constructor() {
    super(url, "carts", cartSchema)
  }

  async getProductsCart() {
    this._setConnection()
    const prods = await this.model.find().populate("products.productId")
    return prods
  }

  async addProductCart (cid, pid) {
    this._setConnection()
    const product = await managerProduct.getElementById(pid)
    if (product) {
      const cart = await this.model.findById(cid).populate('products.productId')
      const existProduct = cart.products.find(element => element.productId.id === pid)
      if (!existProduct) {
        cart.products.push({ productId: pid })
        await cart.save()
        return cart
      } else {
        cart.products = cart.products.map((element) => { 
        if (element.productId.id === pid) {
          element.quantity++
        }             
        return element             
        })        
        await cart.save()
        return cart
      }
    } else {
      throw new Error("Product dont exist")     
    }
  }

  async changeQuantity(cid, pid, quantity) {
    this._setConnection()
    const cart = await this.model.findById(cid).populate('products.productId')
    const existProduct = cart.products.find(element => element.productId.id === pid)
    if (existProduct) {
      cart.products = cart.products.map((element) => { 
        if(element.productId.id === pid) {
          element.quantity = quantity
        }             
        return element             
      })        
    } else {          
      throw new Error("Product sent don exist")       
    }
    await cart.save()
    return cart.products
  }

  async changeAllCart(cid, products) {
    this._setConnection
    const cart = await this.model.findById(cid)
    cart.products = products
    await cart.save()
    return cart
  }

  async deleteProductCart(cid, pid) {
    this._setConnection()  
    const cart = await this.model.findById(cid).populate('products.productId')
    const filteredCart = cart.products.filter((element) => {return element.productId.id !== pid})        
    if (filteredCart.length !== cart.products.length){      
      cart.products = filteredCart
      await cart.save()
      return cart      
    } else {
      return null
    }
  }

  async deleteProductsCart(cid) {
    this._setConnection()
    const cart = await this.model.findById(cid)
    console.log("hola", cart)
    cart.products = []
    cart.save()
    return true
  }
}