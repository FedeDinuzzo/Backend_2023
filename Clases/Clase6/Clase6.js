const crypto = require('crypto')
// import * as crypto from 'crypto'

// Consultar tipos de algoritmos de encriptacion de node
console.log(crypto.getCiphers())

const algoritmo = "aes-256-cbc"
const key = crypto.randomBytes(32)
const iv = crypto.randomBytes(16)

const encriptar = (password) => {
  // Cipher es el objeto encriptador
  const cipher = crypto.createCipheriv(algoritmo, Buffer.from(key), iv) // Como la key es tan pesada y espera cualquier valor hay que trabajarla con Buffer.from
  cipher.update(password) // Preparar el objeto para encriptar, retorna un buffer vacio
  let encriptacion = (cipher.final()) // Resultado de la encriptacion
  // console.log(encriptacion.toString('hex'))
  return {
    iv: iv.toString('hex'), passwordEncriptado: encriptacion.toString('hex') 
  }
}

// Desencriptar
const hackerman = (passwordE) => {
  // Tomo los valores del objeto
  const initV = Buffer.from(passwordE.iv, 'hex')
  const password = Buffer.from(passwordE.passwordEncriptado, 'hex')
  // Creo un objecto para desencriptar la contraseña
  const decipher = crypto.createDecipheriv(algoritmo, Buffer.from(key), initV)
  decipher.update(password) // Preparar el objeto para desencriptar, retorna un buffer vacio
  let desencriptado = decipher.final() // Devolveme el resultado de la desencriptacion
  return desencriptado.toString() // Lo retorno en formato string
}

const password = "CoderHouse"
const passwordEncriptado = encriptar(password)
hackerman(passwordEncriptado)