// SERVIDOR CON NODE
// import http from 'http'

// const PORT = null ?? 4000

// const server = http.createServer((request, response) => {
//   response.end("Hola, este es mi primer servidor en NODE")
// })

// // Ejecutar servidor
// server.listen(PORT, () => {
//   console.log(`Server on port ${PORT}`)
// })

// SERVIDOR CON EXPRESS
import express from 'express'

const app = express() // app es igual a la ejecucion de experess
const PORT = 4000

app.use(express.urlencoded({extended:true})) // Permite realizar consultas en la url

const users = [
  {
    nombre: "Fede",
    apellido: "Dinu",
    id: 1,
    cargo: "Piloto"
  },
  {
    nombre: "Federico",
    apellido: "Di Nuzzo",
    id: 2,
    cargo: "Piloto"
  },
  {
    nombre: "feder",
    apellido: "feder",
    id: 3,
    cargo: "Ingeniero"
  },
]

app.get('/', (req, res) => {
  res.send("Este es mi primer servidor con express")
})

// Objecto request

// req.query consulta dentro de la URL
//http://localhost:4000/user?cargo=piloto&nombre=feder
app.get('/user', (req, res) => {
  const {cargo, nombre} = req.query
  const usuarios = users.filter(user => user.cargo === cargo)
  res.send(JSON.stringify(usuarios))
})

// req.params consulta un elemento en especificio
app.get('/users/:idUser', (req, res) => {
  const idUser = req.params.idUser
  const user = users.find(user => user.id === parseInt(idUser))
  if (user) {
    res.send(`Nombre de usuario: ${user.nombre}`)
  } else {
    res.send("El usuario no existe")
  }
})

app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`)
})

// DESAFIO USAR SLICE
// si existe un limite - if
// app.get('/user', async (req,res) => {
// })
// import {productManager} from 'ruta'