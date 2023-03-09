import { ManagerMongoDB } from '../../../db/mongoDBManager.js'
import { Schema } from 'mongoose'

const url = process.env.URLMONGODB

const messageSchema = new Schema({
  nombre: String,
  apellido: String,
  email: {
    type: String,
    unique: true
  },
  message: String
})


export class ManagerMessageMongoDB extends ManagerMongoDB {
  constructor() {
    super(url, "messages", messageSchema)
    // Aqui irian los atriburtos propios de la clase
    // Ejemplo: const cart = []
  }
  // Aqui irian los metodos de la clase
}