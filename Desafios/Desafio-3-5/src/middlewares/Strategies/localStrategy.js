import local from 'passport-local'
import { findUserByEmail, createUser } from '../../services/userService.js';
import { createCart } from '../../services/cartService.js';
import { createHash, validatePassword } from '../../utils/bcrypt.js'
import { generateToken } from '../../utils/jwt.js'

//Passport se va a manejar como si fuera un middleware 
const LocalStrategy = local.Strategy //Estretagia local de autenticacion

  //Ruta a implementar
export const strategyRegister = new LocalStrategy({
    passReqToCallback: true, 
    usernameField: 'email'
  }, async (req, username, password, done) => {
    //Validar y crear Usuario
    const { first_name, last_name, email } = req.body
    try {
      const user = await findUserByEmail(username) //Username = email

      if (user) { //Usuario existe
        return done(null, false, "user already exists") //null que no hubo errores || false que no se creo el usuario
      }
      const passwordHash = createHash(password)
      const idCart = await createCart()
      
      const userCreated = await createUser({
        first_name: first_name,
        last_name: last_name,        
        email: email,
        password: passwordHash, 
        idCart: idCart.id
      })      
      
      //console.log("nunca se esta devolviendo TOKEN, ver si queda")
      //const token = generateToken(userCreated)
      //console.log("TOKEN=", token)

      return done(null, userCreated) //Usuario creado correctamente

    } catch (error) {
      return done(error)
    }
  }
)

export const strategyLogin =  new LocalStrategy({
    usernameField: 'email' 
  }, async (username, password, done) => {
    try {
      const user = await findUserByEmail(username)

      if (!user) { //Usuario no encontrado
        return done(null, false)
      }
      if (validatePassword(password, user.password)) { //Usuario y contraseña validos
        //console.log("nunca se esta devolviendo TOKEN, ver si queda")
        //const token = generateToken(user)
        //console.log("TOKEN=", token)
        return done(null, user)
      }
      return done(null, false) //Contraseña no valida

    } catch (error) {
      return done(error)
    }
  }
)