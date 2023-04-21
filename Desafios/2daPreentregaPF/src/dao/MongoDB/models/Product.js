import { ManagerMongoDB } from '../../../db/mongoDBManager.js'
import { Schema } from 'mongoose'
import paginate from 'mongoose-paginate-v2'

const url = process.env.URLMONGODB

const productSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  code: {
    type: String,
    required: true,
    unique: true,
    match: /^[a-zA-Z]|[1-9][0-9]?$/
  },
  status: {
    type: Boolean,
    default: true
  },
  stock: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  thumbnail: {
    type: Array,
    default: [""]
  }
})

productSchema.plugin(paginate)

export class ManagerProductMongoDB extends ManagerMongoDB {
  constructor() {
    super(url, "products", productSchema)
  }
  
  async getProducts(limit, page, filter, ord) {
    this._setConnection()

    const products = await this.model.paginate({ filter: filter }, { limit: limit, page: page, sort: { price: ord } })
    return products
  }
}