import { getManagerUsers } from "../dao/daoManager.js"
import { createHash } from "../utils/bcrypt.js"

const data = await getManagerUsers()
export const managerUser = new data.ManagerUserMongoDB

export const createUser = async (req, res) => {
  res.send({status: "Success", message: "User created"})
  // const { first_name, last_name, email, age, password } = req.body
  // try {
  //   const user = await managerUser.getUserByEmail(email)
  //   if (user) {
  //     res.status(200).json({ message: "User already exist" })
  //   }
  //   const hashPassword = createHash(password)
  //   const userCreated = await managerUser.addElements([{ 
  //     first_name: first_name, 
  //     last_name: last_name, 
  //     email: email, 
  //     age: age, 
  //     password: hashPassword 
  //   }])

  //   res.status(200).json({ message: "User created", userCreated})
  // } catch (error) {
  //   res.status(500).json({ message: error.message })
  // }
}

