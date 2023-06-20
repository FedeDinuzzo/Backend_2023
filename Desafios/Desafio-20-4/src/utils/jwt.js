import jwt from "jsonwebtoken"
import config from "../config/config.js"

export const generateToken = (user) => {
  // 1st: Token association object
  // 2nd: Encryption private key
  // 3rd: Expiration time
  const token = jwt.sign({ user }, config.signedCookie, {expiresIn: '24h'})
  return token
}

export const authToken = (req,res,next) => {
  // Header consult
  const authHeader = req.headers.authorization

  // Non-existent or expired token
  if (!authHeader) {
    return res.status(401).send({error: "User not authenticated"})
  }
  // Remove the word Bearer from the token
  const token = authHeader.split(' ')[1]
  // Validate if the token is valid or not
  jwt.sign(token, config.signedCookie, (error,credentials) => {
    if (error) {
      return(res.status(403).send({error: "User not autorized"}))
    }
    // Existing and valid token
    req.user = credentials.user
    next()
  })
}