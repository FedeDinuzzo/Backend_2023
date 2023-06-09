const socket = io()

socket.emit("mensaje", "Hola, esta es mi primera info al servidor") // Enviar informacion a mi servidor

socket.on("mensajegeneral", info => {
  console.log(info)
})

socket.on("mensaje-socket-propio", info => {
  console.log(info)
})