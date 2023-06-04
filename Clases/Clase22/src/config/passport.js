import local from 'passport-local'
import passport from 'passport'
import GitHubStrategy from 'passport-github2'
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

  passport.use('login', new LocalStrategy(
    { usernameField: 'email'}, async (username, password, done) => {
      try {  
        const user = await managerUser.getUserByEmail(username)

        if (!user) { // user not found
          return done(null, false)
          
        }
        if (validatePassword(password, user.password)) {  // Valid user and password
          return done(null, user)
        }

        return done(null, false) // Invalid password
      } catch (error) {
        return done(error)
      }
    }
  ))

  passport.use('github', new GitHubStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: 'http://localhost:4000/authSession/githubSession'
  }, async (accessToken, refreshToken, profile, done) => {

    try {
      console.log(profile)
      const user = await managerUser.getUserByEmail(profile._json.email)

      if (user) { // Usuar exist 
        done(null, user)
      } else {
        const passwordHash = createHash('coder123')
        const userCreated = await managerUser.addElements([{
          first_name: profile._json.name,
          last_name: ' ',
          email: profile._json.email,
          age: 18,
          password: passwordHash // Default password since can not access the github password
        }])
        
        done(null, userCreated)
      }

    } catch (error) {
      return done(error)

    }
  }))

  // Initialize user session
  passport.serializeUser((user, done) => {
    if (Array.isArray(user)) {
      done(null, user[0]._id)
    } else {
      done(null, user._id)
    }
  })


  // Delete user session
  passport.deserializeUser(async (id, done) => {
    const user = managerUser.getElementById(id)
    done(null, user)
  })
}

export default initializePassport
