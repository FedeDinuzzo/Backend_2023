// Loggin y performance

// La consola como barrera en performance
// console.log("Hola mundo")
// asyncronismo y errores que sean iguales
// La solucion son los loggers
// Se muestran con niveles

// Winston Logger
// Se define un transporte y un nivel
// Los transportes se puede escribir en un archivo o enviarse a algun servidor externo por http

// Niveles:
// {
//   error: 0,  // fatal
//   warn: 1,   // error
//   info: 2,   // warn 
//   http: 3,
//   verbose: 4,
//   debug: 5,
//   silly: 6
// }

// Niveles mas bajos mas prioridad
// Un producto sin imagen, se puede comprar, es un info o warning diminuto
// Error que falle una categoria
// Fatal que este caido el sitio



// Mi servidor funcionara en el mundo real?
// Simulando carga de peticiones

// ARTILLERY (toolkit de performance)
// Simula usuarios virtuales
// Trabajar con lapsos de tiempo y trafico real
// npm i artillery -g

// Continua prox clase los reportes