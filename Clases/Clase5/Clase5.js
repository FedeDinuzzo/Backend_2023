// Para ejecutar node en la consola es node nombreArchivo

// id autoincrementable
class Persona {
  constructor(nombre, apellido) {
    this.nombre = nombre
    this.apellido = apellido
    this.id = Persona.addId() // Metodo Estatico
  }

  static addId() {
    if(this.idIncrement) { // Si no existe retorna undefined
      this.idIncrement++ // Si existe le suma 1
    } else {
      this.idIncrement = 1 // Definir propiedad si no existia
    }
    return this.idIncrement
  }
}

const persona1 = new Persona("Federico", "Di Nuzzo")
const persona2 = new Persona("Federico", "Di Nuzzo")
const persona3 = new Persona("Federico", "Di Nuzzo")
const persona4 = new Persona("Federico", "Di Nuzzo")

console.log(persona1, persona2, persona3, persona4)


// MANEJO DE ARCHIVOS
// Persistencia en memoria con archivos de texto
// FileSystem de Windows, archivos de texto
// Implementando archivos en nodejs:fs
// FS en Nodejs es un modulo nativo que nos permite las consultas txt mediante metodos
// Import y Require

// Para trabajar con import y export 2 formas:
// import * as fs from 'fs'
// import fs from 'fs'

// Para trabajar con fileSystem:
const fs = require('fs')

// --- Fs Sincrono ---

// WritreFileSync  Crea un archivo
// readFileSync  leer el archivo
// appendFileSync  añadir nuevo contenido al archivo
// unlinkSync  eliminar txt
// existsSync  existe o no el archivo

fs.writeFileSync('./ejemplo.txt', "hola") // Ruta - Valor
// Si existe lo busca y lo reemplaza

if (fs.existsSync('./ejemplo.txt')) { // = array.some()
  console.log("V") // Si existe mostrame V por consola
  fs.appendFileSync('./ejemplo.txt', 
  `
  Chau
  Buenas noches
  `
  ) // Una sola linea de codigo "" para saltos de linea \n con - backticks interpreta el enter
  let contenido = fs.readFileSync('./ejemplo.txt', "utf-8") // Ruta - tipo de texto  // Si no especifico me devuelve un Buffer
  console.log(contenido)
  fs.unlinkSync('./ejemplo.txt') //Elimino el Archivo
}


// La consulta async se hace porque un readFile por ejemplo consulta todo el .txt lleva mucho tiempo
// --- Fs con callbacks asincronicos ---
fs.writeFile('./ejemplo.txt', "Hola", (error) => {
  if(error) {
    return console.log("Error en escritura")
  }
  fs.readFile("./ejemplo.txt", 'utf-8', (error, resultado) => {
    if(error) {
      return console.log("Error en lectura")
    }
    console.log(resultado)
    fs.appendFile("./ejemplo.txt", "Buenas nochardas", (error) => {
      if (error) {
        return console.log("Error en append")
      }
      fs.readFile('./ejemplo.txt', 'utf-8', (error, resultado) => {
        if (error) {
          return console.log("Error en lectura 2")
        }
        console.log(resultado)
        fs.unlink('./ejemplo.txt', (error) => {
          if (error) {
            return console.log('Error en eliminacion')
          }
        })
      })
    })
  })
})


// --- Fs Asincronico con Promesas ---
// import { promises as fs } from 'fs'
// fs.promises = fs
// Require:
const consultasTXT = async(ruta) => {
  await fs.promises.writeFile(ruta, "Hola con Promesas")
  let contenido = await fs.promises.readFile(ruta, "utf-8")
  console.log(contenido)
  await fs.promises.appendFile(ruta, `Chau, Buenas noches`)
  contenido = await fs.promises.readFile(ruta, "utf-8")
  console.log(contenido)
  await fs.promises.unlink(ruta)
}

consultasTXT('./ejemplo.txt')