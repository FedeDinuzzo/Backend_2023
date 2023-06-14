import dotenv from 'dotenv'
import { Command } from 'commander'

const program = new Command()

program
  .option('--mode <mode>', "Ingrese el modo de trabajo", 'DEVELOPMENT')
program.parse()

// Create a new instance of the Command class and define the '--mode' option

const environment = program.opts().mode

// Get the value of the 'mode' option provided through the command line

const envFilePath = environment === "DEVELOPMENT" ? './.env.development' : './.env.production'
dotenv.config({ path: envFilePath })

// Determine the appropriate environment file path based on the 'mode' option and load the environment variables from the file

export default {
  port: process.env.PORT,
  urlMongoDb: process.env.URLMONGODB,
  dbSelection: process.env.DBSELECTION,  
  cookieSecret: process.env.COOKIE_SECRET,
  sessionSecret: process.env.SESSION_SECRET,
  signedCookie: process.env.SIGNED_COOKIE,
  salt: process.env.SALT,
  clientIdGithub: process.env.CLIENT_ID_GITHUB,
  clientSecretGithub: process.env.CLIENT_SECRET_GITHUB,
  clientIdGoogle: process.env.CLIENT_ID_GOOGLE,
  clientSecretGoogle: process.env.CLIENT_SECRET_GOOGLE,
  mailPass: process.env.MAIL_PASS
}

// Export an object that contains the required configuration values retrieved from the environment variables