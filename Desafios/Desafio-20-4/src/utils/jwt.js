import jwt from "jsonwebtoken"
import config from "../config/config.js"

export const generateToken = (user) => {
  // 1er: Objeto de asociacion del token
  // 2do: Clave privada del cifrado
  // 3er: Tiempo de expiracion
  const token = jwt.sign({ user }, config.signedCookie, {expiresIn: '24h'})
  return token
}

export const authToken = (req,res,next) => {
  // Consultar el header
  const authHeader = req.headers.authorization

  // Token no existente o expirado
  if (!authHeader) {
    return res.status(401).send({error: "User not authenticated"})
  }
  // Sacar la palabra Bearer del token
  const token = authHeader.split(' ')[1]
  // Validar si el token es valido o no
  jwt.sign(token, config.signedCookie, (error,credentials) => {
    if (error) {
      return(res.status(403).send({error: "User not autorized"}))
    }
    // Token existente y valido
    req.user = credentials.user
    next()
  })
}