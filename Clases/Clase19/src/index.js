import 'dotenv/config'
import express from 'express'
import cookieParser from 'cookie-parser'
import session from 'express-session'

const app = express()
const PORT = 4000

// Firmar una cookie con .env
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(express.json())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true, // Me permite cerrar pestaña o recarga y la sesion siga activa
  saveUninitialized: true // Guardar sesion aunque no contenga info
}))

app.listen(PORT, () => console.log(`Server on port ${PORT}`))

// Cookies
// signed:true
app.get('/setCookie', (req, res) => {
  res.cookie('CookieCookie', "Esta es mi primer Cookie", {maxAge:30000, signed:true}).send("Cookie")
})

// Traer: cookies o signedCookies
app.get('/getCookie', (req, res) => {
  res.send(req.signedCookies)
})

// Session
app.get('/session', (req, res) => {
  if(req.session.counter) {
    req.session.counter++
    res.send(`Ingresaste ${req.session.counter} veces`)
  } else {
    req.session.counter = 1 // .counter Variable creada
    res.send("Hola, por primera vez")
  }
})


app.get('/login', (req, res) => {
  const {email, password} = req.body
  // Consulta a BDD
  const users = [{email: "f@f.com", password: "1234"}]
  const user = users[0]
  if (email == user.email && password == user.password) {
    req.session.email = email
    req.session.password = password
    res.send("Usuario Loggeado")
  }

  res.send("Login Invalido")
})

app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.send("Nos vimo")
  })
})