import { managerUser } from "./user.controller.js"
import { validatePassword } from "../utils/bcrypt.js"

export const getSession = (req, res) => {
  if (req.session.login) { // if session is active in mongoose
    res.redirect('/product', {
      'message' : 'Bienvenido/a mi tienda'
    })
  }
  // Session is not active
  res.redirect('/api/session/login', {
    // Loggeo message
  })
}

// export const testLogin = async (req, res) => {
//   // Consultar datos del formulario del login
//   const {email, password } = req.body
//   try {
//     const user = await managerUser.getUserByEmail(email)
//     if (user && validatePassword(password, user.password) ) {
//       req.session.login = true
//       res.status(200).json({
//         message: "User logged in succesfully"
//       })
//     } else {
//       res.status(401).json({
//         message: "User or password incorrect"
//       })
//     }
//   } catch (error) {
//     res.status(500).json({
//       message: error.message
//     })
//   }
// }

export const testLogin = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).send({ status: "error", error: "Invalidate User" })
    }
    // Genero la session de mi usuario
    req.session.user = {
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      age: req.user.age,
      email: req.user.email
    }

    res.status(200).send({ status: "success", payload: req.user })

  } catch (error) {
    res.status(500).send.json({
      message: error.message
    })
  }
}

export const destroySession = (req, res) => {
  if (req.session.login) {
    req.session.destroy()
  }
  res.status(200).json({
    message: "Session destroyed succesfully"
  })
}