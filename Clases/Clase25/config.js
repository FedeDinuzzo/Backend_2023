import dotenv from 'dotenv'
import { Command } from 'commander'

const program = new Command()

program
  .option('--mode <mode>', "Ingrese el modo de trabajo", "DEVELOPMENT") 
program.parse() 

console.log(program.opts())
// node config.js 
// { mode: 'DEVELOPMENT' }

// const enviroment = 'PRODUCTION'
const enviroment = program.opts().mode
// { port: '4000', mongoURL: 'test.bdd', user: 'Admin', password: '1234' }

// node server.js --mode "PRODUCTION"
// {
//   port: '8000',
//   mongoURL: 'real.bdd',
//   user: 'Moderador',
//   password: '4567'
// }

dotenv.config({
  path: enviroment === "DEVELOPMENT" ? './.env.development' : './.env.production'
})

export default {
  port: process.env.PORT,
  mongoURL: process.env.URLMONGO,
  user: process.env.USER,
  password: process.env.PASSWORD
}