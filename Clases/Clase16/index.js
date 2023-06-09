import userModel from "./src/models/user.js"
import courseModel from "./src/models/courses.js"
import mongoose from "mongoose"

const main = async () => {
  // Creo una funcion asincrona para poder conectarme y utilizar user Model
  await mongoose.connect("mongodb+srv://federicodinuzzo98:coderhouse@cluster0.rae3wln.mongodb.net/?retryWrites=true&w=majority")
  // Ver cuanto tiempo tarda en realizar la consulta TESTING
  // const response = await userModel.find().explain('executionStats')
  // console.log(response)
  // resultado 1ms

  // userModel.create([
  //   {name: "Uma", lastname: "Di Nuzzo", username: "Uma", email: "uma@dinu.com", password: "1234"},
  //   {name: "Fiona", lastname: "Dinu", username: "Fiona", email: "fiona@dinu.com", password: "1234"}
  // ]),
  // courseModel.create([
  //   {name: "ProgramacionBackend", codCourse: "4500", schedule: "20:00 - 22:00", days: ["Monday", "Wednsday"]},
  //   {name: "React.js", codCourse: "4600", schedule: "19:00 - 21:00", days: ["Saturday"]}
  // ])

  // const response = await userModel.find({ lastname: "Di Nuzzo" }).explain('executionStats')
  // console.log(response)
  // El populte nos los muestra el curso en el console.log
  const user1 = await userModel.findOne({ _id: "640a709e5098b2b787cd5c64" }).populate("courses.course")
  // user1.courses.push({ course: "640a709e5098b2b787cd5c64" })
  // Referencio un curso a ese id
  // await userModel.findByIdAndUpdate("640a709e5098b2b787cd5c64", user1)
  console.log(user1)
}

main()

