import mongoose from 'mongoose'
import userModel from '../src/dao/models/User.js'
import Assert from 'assert'

const assert = Assert.strict

await mongoose.connect(`mongodb+srv://fededinuzzo:1IXJX7UpUvvHKGR2@cluster0.0tgjndk.mongodb.net/`)

describe("Test de consultas a todos los usuarios", () => {
  // Previo a arrancar todos los test
  before(function () {
    console.log("Arrancando test")
  })

  beforeEach(function () {
    this.timeout(5000) // Por defecto viene con 2000ms
  })

  it("Test para obtener todos los usuarios de mi DB", async function () {
    // Contexto propio del test, tengo un scope propio
    const users = await userModel.find()
    // strictEqual retorna un boolean
    assert.strictEqual(Array.isArray(users), true) // Que sea igual a un array
  })

  it("Test para crear un usuario en mi DB", async function () {
    // Para este tipo de test se consulta a una DB para testing
    const newUser = {
      first_name: "Pepito",
      last_name: "Pepito",
      email: "pepito@pepito.com",
      password: "q23d5ukyn4bv3"
    }

    const resultado = await userModel.create(newUser)
    
    assert.ok(resultado._id) // resultado._id -> id || error o undefined
  })

  it("Eliminar usuario generado", async function () {
    const email = "pepito@pepito.com"

    const user = await userModel.findOneAndDelete({ email : email })
    
    assert.strictEqual(typeof user, 'object')
  })
})