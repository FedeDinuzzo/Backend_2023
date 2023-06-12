import passport from 'passport'
import { strategyRegister, strategyLogin } from './Strategies/localStrategy.js'
import { strategyJWT } from './Strategies/jwtStrategy.js'
import { strategyGithub } from './Strategies/githubStrategy.js'
import { findUserById } from '../services/userService.js'
// import { strategyGoogle } from './Strategies/googleStrategy.js'

const initializePassport = () => {
  passport.use(strategyRegister)
  passport.use(strategyLogin)
  passport.use(strategyJWT)
  passport.use(strategyGithub)
  
  // Initialize user session
  passport.serializeUser((user, done) => {
    done(null, user._id)
  })

  // Delete user session
  passport.deserializeUser(async (id, done) => {
    const user = await findUserById(id)
    done(null, user)
  })
}

export default initializePassport