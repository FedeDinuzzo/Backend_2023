import bcrypt from 'bcrypt'

export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(parseInt(process.env.SALT)))

export const validatePassword = (passwordSend, passwordBDD) => bcrypt.compareSync(passwordSend, passwordBDD)

// Prueba en carpeta
// const password = "coderhouse"
// const cryp = createHash(password)
// // console.log(createHash(password)) 
// // node bcrypt = $2b$10$47ZhkUiG2VooWAI1lkM5E.Y8FguK/7AprfPPBB3r1Yu7NlpzLrDnq

// console.log(validatePassword(password, cryp)) // Devuelve boolean