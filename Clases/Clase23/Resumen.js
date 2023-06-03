// Passport avanzado
// creamos el archivo jwt.js dentro de utils, lo agregamos en passport

// El token no se guarda en la db solo se genera, pero no esta encriptado
// Hay que encriptar los datos del token (mas adelante)

// JWT   -> Envio -> Headers de autorizacion -> Localstorage
//       -> passport

// Pros = no guardas la info en la db
// Cons = tenes que encriptar la info

// Vulnerabilidad en Localstorage:
// Se puede consultar con un comando de JS de 2 lineas
// NO guardarlo en Localstorage

// Enviar Token desde Cookie

// Estrategia de JWT con passport
// npm i passport-jwt
// Se actualiza si se actualiza jwt

// Creamos la estrategia en passport
// Creamos la ruta en session