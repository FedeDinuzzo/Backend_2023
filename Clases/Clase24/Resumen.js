// Ruteo avanzado y manejo de politicas de autorizacion

// Consultar el token de JWT de la clase anterior
// Control interno de mensajes y sistema de roles con passport
// errorMesagges.js

// Registramos un user con postman y validamos el token en jwt.io
// http://localhost:4000/api/session/current
// console
// aplication -> coockies -> new = jwt - el token que dio al registrar
// F5

// Si modifcas un token en jwt.io y te tira error cuando lo pones como antes ya no funciona

// Moddleware de autorizacion mezclado con passport
// mi usuario antes x ruta si no esta autorizado no puede ingresar


// Estrategias avanzadas router
// NO agregar acentos en las rutas ni ñ

// Cualquier ruta que no tiene un metodo definido va a la ruta 404
router.use('*', (req,res) => {
  res.status(404).send({ error: "404 Page Not Found" })
})

// Creando custom router -> proximas clases