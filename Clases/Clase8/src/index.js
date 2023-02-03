import express from 'express'

const app = express()
const PORT = 4000

app.use(express.urlencoded({extended:true}))
app.use(express.json())

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
  res.send("Servidor con express")
})

app.get('/user', (req, res) => {
  const {nombre, apellido, cargo} = req.query
  const usuarios = users.filter(user => user.cargo === cargo)
  res.send(JSON.stringify(usuarios))
})

app.get('/user/:idUser', (req, res) => {
  const idUser = req.params.idUser
  const user = users.find(user => user.id === parseInt(idUser))
  if (user) {
    res.send(`Nombre de usuario: ${user.nombre}`)
  } else {
    res.send("El usuario no existe")
  }
})

app.post('/user', (req, res) => {
  const {nombre, apellido, cargo} = req.body
  const indice = users.length
  users.push({nombre: nombre, apellido: apellido, cargo: cargo, id: indice})
  res.send("User Created Succesfully")
})

app.put('/user/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const {nombre, apellido, cargo} = req.body
  if (users.some(user => user.id === id)) {
    const indice = users.findIndex(usuario => usuario.id === id)
    users[indice].nombre = nombre
    users[indice].apellido = apellido
    users[indice].cargo = cargo
    res.send("User Changed")
  }

  res.send("User not founded")
})

app.delete('/user/:idUser', async (req, res) => {
  const idUser = req.params.idUser
  const index = users.findIndex(user => user.id === parseInt(idUser))
  if (index != -1) {
    users.splice(index, 1)
    res.send("User Deleted")
  } else {
    res.send("User doesnt exists")
  }
})

app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`)
})