import GitHubStrategy from 'passport-github2'
import { findUserByEmail, createUser } from '../../services/userService.js';
import { createCart } from '../../services/cartService.js';
import { createHash } from '../../utils/bcrypt.js'
import { generateToken } from '../../utils/jwt.js'
import config from "../../config/config.js"


const githubOptions = {
  clientID: config.clientIdGithub,
  clientSecret: config.clientSecretGithub,
  callbackURL: 'http://localhost:4000/authGithub/githubSession'
}


export const strategyGithub = new GitHubStrategy(githubOptions, async (accessToken, refreshToken, profile, done) => {
  try {
    const user = await findUserByEmail(profile._json.email)
    
    if (user) { // User already exist at db
      const token = generateToken(user)
      console.log("TOKEN=", token)
      return done(null, user, {token: token})
    } else {
      const passwordHash = createHash('coder123')
      const idCart = await createCart()
      const userCreated = await createUser({
        first_name: profile._json.login,
        last_name: profile._json.html_url,
        email: profile._json.email,
        password: passwordHash, // Default password since can't access github password
        idCart: idCart.id
      })
      const token = generateToken(userCreated)
      console.log("TOKEN=", token)

      return done(null, userCreated, {token: token})
    }
  } catch (error) {
    return done(error)
  }
})
