import { ManagerMongoDB } from "../../../db/mongoDBManager.js"
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

  // async addProductCart(cid, idProd, cant) {
  //   this._setConnection()
  //   const cart = await this.model.findById(cid)
  //   cart.products.push({ productId: idProd, quantity: cant })
  //   return cart.save()
  // }

  addProductCart = async (cid, pid) => {
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


  async getProductsCart() {
    this._setConnection()
    const prods = await this.model.find().populate("products.productId")
    return prods
  }

  async deleteProductCart(cid, pid) {
    this._setConnection()
    const cart = await this.model.findById(cid)
    cart.products.filter(prod => prod._id != pid)
    cart.save()
    return true
  }

  async deleteProductsCart(cid) {
    this._setConnection()
    const cart = await this.model.findById(cid)
    cart.products = []
    cart.save()
    return true
  }

  async updateProductCart(id, ...props) {
    this._setConnection()
    const cart = await this.model.findById(id)
    const aux = { ...props }
    cart.products.findIndex(prod => prod._id == id)
    cart[index] = aux
    cart.save()
    return true
  }

  async updateProductsCart(id, products) {
    this._setConnection()
    const cart = await this.model.findById(id)
    cart.products = products
    cart.save()
    return true
  }
}