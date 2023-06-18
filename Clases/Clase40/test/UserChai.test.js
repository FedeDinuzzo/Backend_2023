import mongoose from 'mongoose'
import userModel from '../src/dao/models/User.js'
import chai from 'chai'

await mongoose.connect(`mongodb+srv://fededinuzzo:1IXJX7UpUvvHKGR2@cluster0.0tgjndk.mongodb.net/`)

const expect = chai.expect

describe("Test con chai para users", () => {
  before(function () {
    console.log("Arrancando test con chai")
  })

  beforeEach(function () {
    this.timeout(5000) // Por defecto viene con 2000ms
  })

  it("Consultar todos los usuarios de mi DB con chai", async function () {
    const users = await userModel.find()

    expect(Array.isArray(users)).to.be.ok // Revisar si es V o F
    expect(users).to.be.deep.equal([]) // Revisa si el array es vacio
    // expect(users).deep.equal([])
  })

})