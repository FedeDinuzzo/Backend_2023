const socket = io()
const name = document.getElementById("name")
const email = document.getElementById("email")
const message = document.getElementById("msg")
const text = document.getElementById("view")

window.addEventListener("load", () => {
    socket.emit("loadMsg")    
})

socket.on("pushMsg", async msg => {
  name.value = ""
  email.value = ""
  message.value = ""
  text.content = ""
  msg.forEach(msg => {
    text.content += `${msg.name} [(${msg.email})]: ${msg.message}\n`
  })
})

sendMessage = ()=>{
  if (name.value && email.value && message.value) {
    let newMsg = {
      "name":    name.value,
      "email":   email.value,
      "message": message.value
    }
    
    socket.emit("addMessage", newMsg)
        
  } else {
    alert("Some fields are empty, please complete them")
  }
}
