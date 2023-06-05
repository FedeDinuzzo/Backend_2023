import { Command } from "commander"

const program = new Command() // Create a new command

program
  .option('-d', "Variable para el debug", false) 
  // Flag o referencia a los ingresado - descripcion - valor por defecto
  .option('-p <port>', "Puerto del servidor", 4000)
  .option('--mode <mode>', "Modo de trabajo", 'production')
  .requiredOption('-u <user>', "Usuario de mi app", "No se ingreso ningun usuario");
  // Flag - descripcion - Mensaje de error
program.parse() 
// Finalizar la configuracion de mi programa

console.log(program.opts()) // Ver las opciones
console.log(program.args) // Ver los argumentos
// node server.js -d -p 8080 --mode 'Development' -u fededinu

import config from "./config.js"
console.log(config)

import express from 'express'
import { fork } from 'node:child_process'
// import { operacionCompleja } from './calculoMatematico.js'

const app = express()

app.get("/", (req,res) => {
  const child = fork('./calculoMatematico.js')
  // Calcula hilos hijos que necesita para la ejecucion
  child.send("Ejecutate") // Enviar mensaje a mis hilos
  child.on('message', resultado  => { // Cuando termina la ejecucion
    res.send(`${resultado}`)
  })

  // const resultado = operacionCompleja()
  // res.send(`${resultado}`)
})

app.listen(4000, () => {
  console.log("Server on port 4000")
})