import { createUser } from "../services/UserService.js"

// Register -> Login(con un JWT) a veces necesito la validacion del email
// Por eso no los loggeamos directamente

// Login -> Manejo de situaciones de JWT

// 1) Error en passport con el TOKEN -> ERROR
// 2) Token no existe
//    Entonces, consulto a la BDD
//       a) Use no encontrado en mi BDD -> ERROR
//       b) Pass no valida -> ERROR
//       c) User y pass validos -> ENVIAR TOKEN 
// 3) Token Existe
//       a) Token no valido -> ERROR
//       b) Token valido - Ingresa sin enviar datos
//                         resolves que pide token en ruta login coderhouse plataforma

export const registerUser = async (req, res) => {
  //

}

// passport.authenticate('jwt', async(err, user, info))

export const loginUser = async (req, res) => {
  //
  
}