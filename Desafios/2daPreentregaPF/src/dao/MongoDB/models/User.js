import { ManagerMongoDB } from '../../../db/mongoDBManager.js'
import { Schema } from 'mongoose'

const url = process.env.URLMONGODB

const userSchema = new Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true,
    index: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  rol: {
    type: String,
    default: "user"
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  idCart: {
    type: Schema.Types.ObjectId,
    ref: "carts"
  }
})

export class ManagerUserMongoDB extends ManagerMongoDB {
  constructor() {
    super(url, "users", userSchema)
  }

  async getUserByEmail(email) {
    super._setConnection()
    return await this.model.findOne({ email: email })
  }
}