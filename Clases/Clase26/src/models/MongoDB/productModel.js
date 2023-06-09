import { Schema, model } from 'mongoose'
import paginate from 'mongoose-paginate-v2'

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

const productModel = model("Products", productSchema)

export default productModel