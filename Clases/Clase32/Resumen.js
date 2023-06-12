// Optimizacion y middleware errors

// La realidad de un servidor
// Optimizar el rendimiento del servidor

// Utilizar funciones asincronicas
// Realizar un correcto loggeo (los console.log(bloquean)), borrarlos en produccion, para reemplazarlo se usa logger
// Usa una variable de entorno
// Clusterizar nuestra app (definir hilos de ejecucion)
// Config server to automatically reload
// Manejar correctamente los errores (errore fatales - moderadores - leves)
// Realizar balanceos de carga (dividir la carga en los 4 servers ej 25% 25% 25% 25%)
// Realizar compresion (Brotli, gzip, deflate)
// Utilizar un proxi inverso (anonimato de servidores)

// Se usa un middleware
// npm i express-compression

// Compresion (minifcar info de la consulta)
// Compresion con Brotli



// Middleware para manejo de errore
// Flujo de errores

// Libreria de errores (diccionario)
// empresas grandes, si no agregar comentarios
// CustomErrors.js (en utils o helpers)

// Mini diccionario
const EErrors = {
  ROUTING_ERROR:1,
  INVALID_TYPES_ERROR:2,
  DATABASE_ERROR:3 // Only examples
}

export default EErrors;

// CustomError:
export default class CustomError {
  static createError({name="Error", cause, message, code=1}){
    const error = new Error(message, {cause})
    error.name=name
    error.code=code
    throw error
  }
}

// Info.js
export const generateUserErrorInfo = (user) => {
  return `One or more propierties were incompleted or not valid.
  List of required propierties:
  * first_name: needs to be a string, recived ${user.first_name}
  * last_name: needs to be a string, recived ${user.last_name}
  * email: needs to be a string, recived ${user.email}`
}

// Se genera luego el codigo custom del error