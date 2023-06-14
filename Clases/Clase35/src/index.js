// import express from 'express'
// import { addLogger } from './utils/logger.js'

// const app = express()
// app.use(addLogger)

// app.get("/", (req, res) => {
//   req.logger.fatal('ERROR, en todas las categorias') // warn("ALERTA, no hay precios en x producto")
//   req.logger.error('ERROR, en todas la categoria alimentos') 
//   req.logger.warn('WARNING, no se encuentra producto x') 
//   req.logger.debug('OK, todo funciona') 
//   // Se crea el archivo de error
//   res.send("Hola")
// })

// app.get("/suma", (req,res) => {
//   let suma = 0

//   for(let i = 0; i < 10000; i++) {
//     suma += i
//   }

//   res.send(suma)
//   // artillery quick --count 30 --num 40 "http://localhost:4000/suma" -o reporte.json
//   // 30 users 40 peticiones por user = 1200 
//   // (ejecutar en otra terminal en la misma carpeta del proyecto)
// })

// app.listen(4000, () => console.log("Server on Port 4000"))
import express from 'express'
import cluster from 'cluster'
import { cpus } from 'os'

// Mi maquina soporta cuantos hilos? los nucleos de la pc
const numbSubProcesos = cpus().length
// console.log(numbSubProcesos) max num 8

if (cluster.isPrimary) { // true
  console.log("Soy el proceso prinicpal supervisor")
  // Genero mas subprocesos (8)
  for(let i = 0; i < numbSubProcesos; i++) {
    cluster.fork() // Genero un proceso hilo
  }
} else {
  const app = express()
  app.get("/suma", (req,res) => {
    let suma = 0
    for(let i = 0; i < 10000; i++) {
      suma += i
    }
    console.log({status: "success", message: `Hola, soy un subproceso con el id ${process.pid} con el resultado ${suma}`})
  })
  console.log(`Hola, soy un subproceso con el id ${process.pid}`)
  app.listen(4000, () => console.log("Server on Port 4000"))
  // cluster.fork() no puedo generar un subproceso a traves de otro subproceso
}

