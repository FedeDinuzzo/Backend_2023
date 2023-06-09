import mongoose from "mongoose"

export class gestorMongoDB {
  #url
  constructor(url, collection, schema) {
    this.#url = url // Atributo privado
    this.collection = collection
    this.schema = new mongoose.Schema(schema)
    this.model = mongoose.model(this.collection, this.schema)
  }

  async #setConnection() { // metodo estatico de la clase
    try {
      await mongoose.connect(this.url)
      console.log("DB is connected")
    } catch (error) {
      return error
    }
  }

  async addElements(elemnts) { // Agrego 1 o varios elementos
    this.#setConnection()
    try {
      return await this.model.insertMany(elemnts)
    } catch (error) {
      return error
    }
  } 

  async getElements() { // Agrego 1 o varios elementos
    try {
      return await this.model.find()
    } catch (error) {
      return error
    }
  } 

  async getElementsById(id) { // Agrego 1 o varios elementos
    try {
      return await this.model.findById(id)
    } catch (error) {
      return error
    }
  } 

  async updateElement(id, info) { // Agrego 1 o varios elementos
    try {
      return await this.model.findByIDAndUpdate(id, info)
    } catch (error) {
      return error
    }
  } 

  async deleteElement(id) { // Agrego 1 o varios elementos
    try {
      return await this.model.findByIDAndDelete(id)
    } catch (error) {
      return error
    }
  } 
}