var nombre = "Federico"
var nombre = "Fede"
// Pisamos el valor y lo reemplazamos en memoria

let nombre = "Federico"
nombre = "Fede"
const nombre1 = "Solana"
nombre1 = null
// let y const no se pueden volver a declarar evitando reemplazar o borrar las existentes

console.log("Hola coders, bienvenidos/as a Backend")

// Tipos de Datos

// String - Number - Booleans - Null - Undefined
// Predefinidos de JS: Date, RegExp, Error
// Funciones simples Clases
// Arrays
// Objetos especiales

let nombre2 = "Federico" //0x01
let nombre3 = nombre2 //0x02
// Con datos primitivos crea un nuevo valor en otra referencia de memoria

// PROBLEMA DE JS referencia memoria

const user = {
  nombre: "Fede",
  apellido: "Dinu",
  mascotas: [
    {nombre: "Uma", raza: "siamesa"},
    {nombre: "Michi", raza: "Angora"},
  ]
}

const user2 = user
// Mismos datos, misma pocision en memoria

// user -> 0x03
// user2 -> 0x03

user2.nombre = "Pancho"
// Aunque modifiques solo a user2 tambien se modifica user

console.log(user)
console.log(user2)

// El operador SPREAD desparrama, elimina la referencia a memoria
// De esta manera no se reemplazan ambos
const user2 = {...user}

// user -> 0x03
// user2 -> 0x04

user2.mascotas[0] = null
// El objeto mascotas copia la referencia a memoria entonces se borra en user y user2

console.log(user)
console.log(user2)

const user2 = (structuredClone(2))
// Solamente al usuario 1 se le fue Uma

console.log(user2 + "StructuredClone")

// Si pasamos un objeto a JSON perdemos la referencia a memoria, es una solucion
// Otra es hacer operador spread en cada interacion
// Otra es una funcion de JS que se creo con este proposito
// STRUCTURED CLONE structuredClone()
// Copia parcial, copia el objeto pero elimina la referencia de memoria del objeto principal