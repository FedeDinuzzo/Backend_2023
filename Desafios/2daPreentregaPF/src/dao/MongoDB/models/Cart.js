import { ManagerMongoDB } from "../../../db/mongoDBManager.js"
import { Schema } from "mongoose"

const url = process.env.URLMONGODB

const cartSchema = new mongoose.Schema({
  products: {
    type: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'products',
          required: true
        },
        quantity: {
          type: Number,
          default: 1
        }
      }
    ],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

export class ManagerCartMongoDB extends ManagerMongoDB {
  constructor() {
    super(url, "carts", cartSchema)
  }

  async addProductCart(id, idProd, cant) {
    super.setConnection()
    const cart = await this.model.findById(id)
    cart.products.push({ id_prod: idProd, quantity: cant })
    return cart.save()
  }

  async getProductsCart() {
    super.setConnection()
    const prods = await this.model.find().populate("products.id_prod")
    return prods
  }

  async deleteProductCart(id) {
    super.setConnection()
    const cart = await this.model.findById(id)
    cart.products.filter(prod => prod._id != id)
    cart.save()
    return true
  }

  async deleteProductsCart(id) {
    super.setConnection()
    const cart = await this.model.findById(id)
    cart.products = []
    cart.save()
    return true
  }

  async updateProductCart(id, ...props) {
    super.setConnection()
    const cart = await this.model.findById(id)
    const aux = { ...props }
    cart.products.findIndex(prod => prod._id == id)
    cart[index] = aux
    cart.save()
    return true
  }

  async updateProductsCart(id, products) {
    super.setConnection()
    const cart = await this.model.findById(id)
    cart.products = products
    cart.save()
    return true
  }
}
