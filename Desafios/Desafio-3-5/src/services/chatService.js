import chatModel from '../models/MongoDB/chatModel.js'

export const findMsg = async () => {
  try {
    const msgs = await chatModel.find()
    return msgs
  } catch (err) {
    throw new Error(err)
  }
}

export const updateMsg = async (msg) => {
  try {        
    return await chatModel.insertMany(msg)
  } catch (err) {
    throw new Error(err)
  }
}