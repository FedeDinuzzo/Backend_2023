import { findUsers, findUser, findUserByEmail } from "../services/UserService.js"

export const getUsers = async (req, res) => {
  // Todo lo que refiere a control de parametros
  try {
    const users = await findUsers()
    res.status(200).send(users)
  } catch (error) {
    res.status(500).send(error)
  }
}