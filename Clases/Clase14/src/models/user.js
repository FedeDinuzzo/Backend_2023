import { Schema, model } from "mongoose"

const userCollection = "users"

const userSchema = new Schema({
  nombre: String,
  apellido: String,
  email: {
    type: String,
    unique: true
  },
  password: String
})

export const userModel = model(userCollection, userSchema)
// A que coleccion va a hacer referencia el modelo y que atributos va a tener