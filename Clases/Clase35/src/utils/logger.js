import winston from 'winston'

const customLevelOpt = {
  levels: {
    fatal: 0,
    error: 1,
    warn: 2,
    info: 3,
    debug: 4
  },
  colors: {
    fatal: 'red',
    error: 'cyan',
    warn: 'yellow',
    info: 'blue',
    debug: 'green'
  }
}

const logger = winston.createLogger({
  levels: customLevelOpt.levels, // Defino que los levels del logger sean los previos
  // Defino los transportes que va a obtener mi logger
  transports: [
    // new winston.transports.Console({ level: "http" }),
    new winston.transports.Console({ 
      level: "info",
      format: winston.format.combine(
        winston.format.colorize({ colors: customLevelOpt.colors }),
        winston.format.simple()
      )
    }),

    new winston.transports.File({ 
      // filename: './errors.log', level: "warn" 
      level: "fatal",
      filename: './errors.log',
      format: winston.format.combine(
        winston.format.colorize({ colors: customLevelOpt.colors }),
        winston.format.simple()
      )
    }),
    
    new winston.transports.File({ 
      // filename: './errors.log', level: "warn" 
      level: "error",
      filename: './errors.log',
      format: winston.format.combine(
        winston.format.colorize({ colors: customLevelOpt.colors }),
        winston.format.simple()
      )
    }),

    new winston.transports.File({ 
      // filename: './errors.log', level: "warn" 
      level: "debug",
      filename: './debug.log',
      format: winston.format.combine(
        winston.format.colorize({ colors: customLevelOpt.colors }),
        winston.format.simple()
      )
    })
  ]
})

export const addLogger = (req, res, next) => {
  req.logger = logger // Poder utilizar el logger definido previamente
  req.logger.info(`${req.method} en ${req.url} - ${new Date().toLocaleTimeString}`)
  next()
}