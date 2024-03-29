import local from 'passport-local'
import passport from 'passport'
import GitHubStrategy from 'passport-github2'
import jwt from 'passport-jwt'
import { managerUser } from '../controllers/user.controller.js'
import { createHash, validatePassword } from '../utils/bcrypt.js'
import { authToken, generateToken } from '../utils/jwt.js'

// Passport se va a manejar como si fuera un middleware
const LocalStrategy = local.Strategy // Estrategia local de autenticacion

const JWTStrategy = jwt.Strategy // Estrategia de JWT
const ExtractJWT = jwt.ExtractJwt // Extracto ya sea de headers o cookies, etc...

// Passport define done como si fuera un res.status()
const initializePassport = () => {

  const cookieExtractor = (req) => {
    // Si existen cookies, verfico si existe mi cookie especifica, si no asigno null
    const token = req.cookies ? req.cookies.jwtCookies : null
    // Si no existe la cookie especifica, asigna undefined
    return token
  }

  passport.use('jwt', new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]), // De donde extraigo mi token
    secretOrKey: process.env.COOKIE_SECRET // Mismo valor que la firma de las cookies
  }, async(jwt_payload, done) => {
    try {
      return done(null, jwt_payload)
    } catch (error) {
      return done(error)
    }
  }))

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
        const userCreated = await managerUser.addElements({ 
          first_name: first_name, 
          last_name: last_name, 
          email: email, 
          age: age, 
          password: passwordHash
        })
        const token = generateToken(userCreated)
        console.log(token)
        return done(null, userCreated[0])

      } catch (error) {
        return done(error)
      }
    }
  ))

  passport.use('login', new LocalStrategy(
    { usernameField: 'email'}, async (username, password, done) => {
      try {  
        const user = await managerUser.getUserByEmail(username)

        if (!user) { // User not found
          return done(null, false)
          
        }
        if (validatePassword(password, user.password)) {  // Valid user and password
          const token = generateToken(user)
          console.log(token)
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

      if (user) { // User exist 
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
