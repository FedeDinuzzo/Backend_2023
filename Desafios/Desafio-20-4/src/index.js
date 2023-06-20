import config from "./config/config.js"
import express from 'express'
import { __dirname } from './path.js'
import * as path from 'path'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import mongoose from 'mongoose';
import routes from './routes/routes.js'
import passport from "passport"
import initializePassport from "./middlewares/passport.js"

// Port Server
const app = express() 

// Middlewares
app.use(express.json()) 
app.use(express.urlencoded({extended: true}))
app.use(cookieParser(config.signedCookie))

// Session
app.use(session({  
  secret: config.sessionSecret,
  resave: true,
  saveUninitialized: true
}))


//MONGOOSE (set and connection)
const connectionMongoose = async () => {
  try {
    await mongoose.connect(config.urlMongoDb, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('Connected to the database')
    // Start interacting with the database
  } catch (error) {
    console.error('Error connecting to the database:', error)
  }
}

connectionMongoose()

// Passport
app.use(passport.initialize())
initializePassport(passport)

// Routes
app.use('/', routes)

// Server launch
app.set("port", config.port || 5000)

app.listen(app.get("port"), () => {
  console.log(`Server on http://localhost:${app.get("port")}`)
})