import { managerUser } from "./user.controller.js"
import { validatePassword } from "../utils/bcrypt.js"
import { generateToken } from '../utils/jwt.js'

export const getSession = (req, res) => {
  try {
    if (req.session.login) {
      const sessionData = {}

      if (req.session.userFirst) {
        sessionData.name = req.session.userFirst
        sessionData.rol = req.session.rol
        sessionData.idCart = req.session.idCart
      } else {
        sessionData.name = req.session.user.first_name
        sessionData.rol = req.session.user.rol
        sessionData.idCart = req.session.idCart
      }
      return sessionData
    } else {
      res.redirect('/login', 500, { message: "Log in to continue" })
    }
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

// Admin
// email: admin@coder.com
// password: coderhouse
export const testLogin = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await managerUser.getUserByEmail(email)

    if (user && validatePassword(password, user.password)) {
      req.session.login = true
      req.session.userFirst = user.first_name
      req.session.rol = user.rol
      req.session.idCart = user.idCart
      console.log(`${email} is ${user.rol}`)
      console.table(req.session)
      const token = generateToken(user)
      res
        .status(200)
        .cookie('jwtCookies',token,{maxAge: 30000}).send('Cookie')
    } else {
      res.status(401).json({
        message: "User or password incorrect"
      })
    }
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

export const destroySession = (req, res) => {
  try {
    if (req.session.login) {
      req.session.destroy()
      console.log(`Session closed`)
    }

    res.status(200).redirect('/')
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

export const requireAuth = (req, res, next) => {
  req.session.login ? next() : res.redirect('/login')
}