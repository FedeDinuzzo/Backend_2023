import local from 'passport-local'
import passport from 'passport'
import { managerUser } from '../controllers/user.controller.js'
import { createHash, validatePassword } from '../utils/bcrypt.js'

// Passport se va a manejar como si fuera un middleware
const LocalStrategy = local.Strategy // Estrategia local de autenticacion

// Passport define done como si fuera un res.status()
const initializePassport = () => {
  passport.use('register', new LocalStrategy(
    {passReqToCallback: true, usernameField: 'email'}, async (req, username, password, done) => {
      // Validar y crear usuario
      const { first_name, last_name, email, age } = req.body
      
      try {
        const user = await managerUser.getUserByEmail(email) // username = email

        if (user) { // If user exist (in the controller)
          return done(null, false) // NULL no errors - FALSE user was not created
        }

        const passwordHash = createHash(password)
        const userCreated = await managerUser.addElements([{ 
          first_name: first_name, 
          last_name: last_name, 
          email: email, 
          age: age, 
          password: passwordHash
        }])

        return done(null, userCreated)

      } catch (error) {
        return done(error)
      }
    }
  ))

  // Initialize user session
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  // Delete user session
  passport.deserializeUser(async (id, done) => {
    const user = managerUser.getElementById(id)
    done(null, user)
  })
}

export default initializePassport
