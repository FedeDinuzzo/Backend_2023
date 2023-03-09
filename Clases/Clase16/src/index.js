import 'dotenv/config'
import express from 'express'
import { Server } from 'socket.io'
import { getManagerMessages } from './dao/daoManager.js'

const app = express()
const managerMessage = getManagerMessages()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.set("port", process.env.PORT || 8080)

const server = app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`)
})

const io = new Server(server)

io.on("connection", (socket) => {
  socket.on("message", (info) => {
    managerMessage.addElements([info]).then(() => {
      const mensajes = managerMessage.getElements()
      console.log(mensajes)
      socket.emit('allMessages', mensajes)
    })
  })
})