import config from './config/config.js'
import express from 'express'
import { __dirname } from './path.js'
import * as path from 'path'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import routes from './routes/routes.js'
import passport from 'passport'
import initializePassport from './middlewares/passport.js'
import session from 'express-session'
import nodemailer from 'nodemailer' 
import errorHandler from './middlewares/errors/errorHandler.js'
import { Server } from 'socket.io'
import { engine } from 'express-handlebars'
import { findMessages, updateMessage } from './services/chatService.js'

// Port Server
const app = express() 

let transporter = nodemailer.createTransport({ // Generating the way to send info
  host: 'smtp.gmail.com', // Defines the email service (gmail)
  port: 465,
  auth:{
    user:'federico.dinuzzo.soluciones@gmail.com',
    pass: config.mailPass,
    authMethod: 'LOGIN'
  }
})

app.get('/email', async (req,res)=>{
  await transporter.sendMail({
    from:'federico.dinuzzo.soluciones@gmail.com',
    to: "federicodinuzzo98@gmail.com",
    subject: "Ecommerce",
    html:`
    <div>
      This is an test example ecommerce email
    </div>
    `,
    attachments: []
  })
  res.send("email sent")
})

// Middlewares
app.use(express.json()) 
app.use(express.urlencoded({extended: true}))
app.use(cookieParser(config.signedCookie))
app.use(errorHandler)

// Session
app.use(session({  
  secret: config.sessionSecret,
  resave: true,
  saveUninitialized: true
}))

// Passport
app.use(passport.initialize())
initializePassport(passport)


// Mongoose
const connectionMongoose = async () => {
  try {
    await mongoose.connect(config.urlMongoDb, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to the database')
    // Start interacting with the database
  } catch (error) {
    console.error('Error connecting to the database: ', error)
  }
}

connectionMongoose()

// Handlebars
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', path.resolve(__dirname, './views')); // __dirname + './views'

// Routes
app.use('/', express.static(__dirname + '/public')) // Public Folder
app.use('/', routes)

// Server launch
app.set("port", config.port || 5000)

const server = app.listen(app.get("port"), () => {
  console.log(`Server on http://localhost:${app.get("port")}`)
})

//ServerIO
const io = new Server(server)

io.on("connection", async (socket) => {  
  console.log("Socket client connected")
  
  socket.on("loadMessage", async () => {
    const textMessage = await findMessages()
    socket.emit("pushMessage", textMessage)
  })
  
  socket.on("addMessage", async (newMessage) => {
    await updateMessage([newMessage])  

    const textMessage = await findMessages()    
    socket.emit("pushMessage", textMessage)
  })
})

