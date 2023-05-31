import { managerUser } from "./user.controller.js"
import { validatePassword } from "../utils/bcrypt.js"
// import { generateToken } from '../utils/jwt.js'

export const getSession = (req,res) => {
  try {
    if (req.session.login) {
      const sessionData = {}
            
      if (req.session.userFirst) {
        sessionData.name= req.session.userFirst
        sessionData.rol= req.session.rol
      } else {
        sessionData.name= req.session.user.firstname
        sessionData.rol= req.session.user.rol      
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

export const testLogin = async (req, res) => {
  try {
    const {email, password } = req.body

    if (email === "admin@coder.com" && password === "admincoder1234") {
      req.session.login = true
      req.session.userFirst = "Admin Coder"
      req.session.rol = "admin"
      console.log(`${email} is admin`)
      res.redirect('/products')
    } else {
      const user = await managerUser.getUserByEmail(email)

      if (user && validatePassword(password, user.password)) {
        req.session.login = true
        req.session.userFirst = user.firstname
        req.session.rol = user.rol
        console.log(`${email} is ${user.rol}`)
        console.table(req.session)  
        // const token = generateToken(user)
        res
          .status(200).json({ message: "User logged in succesfully" })
          // .cookie('jwtCookies',token,{maxAge: 30000}).send('Cookie')
      } else {
        res.status(401).json({
          message: "User or password incorrect"
        })
      }
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