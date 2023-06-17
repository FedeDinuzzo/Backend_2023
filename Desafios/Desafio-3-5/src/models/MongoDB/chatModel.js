import {Schema, model} from "mongoose"

const chatSchema = new Schema({
  name: String, 
  email: {
    type: String    
  },
  msgs: String
})


const chatModel = model("msgs", chatSchema)
export default chatModel