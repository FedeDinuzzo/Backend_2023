import bcrypt from 'bcrypt'

export const createHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(parseInt(process.env.SALT)))
}

export const validatePassword = (passwordSend, passwordBDD) => {
  return  bcrypt.compareSync(passwordSend, passwordBDD)
}