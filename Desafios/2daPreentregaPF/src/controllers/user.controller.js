import { getManagerUsers } from "../dao/daoManager.js"

const data = await getManagerUsers()
export const managerUser = new data.ManagerUserDB

export const createUser = async (req, res) => {
  res.send({status: "success", message: "User Created"})
}

