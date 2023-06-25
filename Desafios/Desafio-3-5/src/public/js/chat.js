const socket = io()
const name = document.getElementById("name")
const email = document.getElementById("email")
const message = document.getElementById("message")
const text = document.getElementById("view")

window.addEventListener("load", () => {
    socket.emit("loadMessage")    
})

socket.on("pushMessage", async textMessage => {
  name.value = ""
  email.value = ""
  message.value = ""
  text.content = ""
  textMessage.forEach(textMessage => {
    text.content += `${textMessage.name} [(${textMessage.email})]: ${textMessage.message}\n`
  })
})

sendMessage = ()=>{
  if (name.value && email.value && message.value) {
    let newMsg = {
      "name":    name.value,
      "email":   email.value,
      "message": message.value
    }
    
    socket.emit("addMessage", newMessage)
        
  } else {
    alert("Some fields are empty, please complete them")
  }
}
