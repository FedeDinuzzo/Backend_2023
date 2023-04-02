import mongoose from "mongoose"

export class ManagerMongoDB {
  #url
  constructor(url, collection, schema) {
    this.#url = url
    this.collection = collection
    this.schema = schema
    this.model = mongoose.model(this.collection, thi.schema)
  }
  
  async #setConnection() {
    try {
      await mongoose.connect(this.#url)
      console.log("MongoDB Connected")
    } catch (error) {
      return error
    }
  }

  async addElements(elements) {
    this.#setConnection()
    try {
      console.log("Not able to insert")
      const insertar = await this.model.insertMany(elements)
      console.log("Able to insert", insertar)
    } catch (error) {
      return error
    }
  }

  async getElements(limit) {
    this.#setConnection() 
    try {
      return await this.model.find().limit(limit)
    } catch (error) {
      return error
    }
  }

  async getElementById(id) {
    this.#setConnection()
    try {
      return await this.model.findById(id)
    } catch (error) {
      return error
    }
  }

  async updateElement(id, info) {
    this.#setConnection()
    try {
      return await this.model.findByIdAndUpdate(id, info)
    } catch (error) {
      return error
    }
  }

  async deleteElement(id, info) {
    this.#setConnection()
    try {
      return await this.model.findByIdAndDelete(id)
    } catch (error) {
      return error
    }
  }
}