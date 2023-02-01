// ECMA 6
class Empleado {
  cosntructor(nombre, apellido, edad, sueldo) {
    this.nombre = nombre
    this.apellido = apellido
    this.edad = edad
    this.sueldo = sueldo
  }

  actualizarSueldo(porcentaje){
    this.sueldo *= porcentaje
  }

  // Metodo de consulta
  get consultarSueldo() {
    return this.sueldo
  }

  // Metodo de modificacion
  set modificarSueldo(nuevoSueldo) {
    this.sueldo = nuevoSueldo
  }
}

const empleado1 = new Empleado('pedro', 'parker', 20, 12000)

// Aunque lo modifiques
empleado1.modificarSueldo = 9000
console.log(empleado1.consultarSueldo)

// Te deja volver a cambiarlo no podes restringirlo
empleado1.sueldo = 10000
console.log(empleado1.sueldo)

// Los metodos Get y Set en ECMAScript 6 no sirven, recien en la 10 se pueden usar con restricciones


// ECMA 7
// Operador de potencia
console.log(math.pow(5,3))
console.log(5**3)

// Includes
const nombres = ['Fran', 'Fede', 'Guido', 'Toba']
console.log(nombres.includes('Fran')) // True
console.log(nombres.includes('Pine')) // False


// ECMA 8
// Async await (Se ve en la clase 4)

// Object.entries - Object.values - Object.keys
const libro = {
  nombre: "Padro de la mar",
  editorial: "Atlantida",
  autor: "Sancho Panza",
  year: 2021,
  precio: 300,
  stock: 3,
}

// Keys devuelve las claves
console.log(object.keys(libro));
// Values devuelve los valores de las keys
console.log(object.values(libro));
// Entries devuelve las claves y los valores
console.log(object.entries(libro));


// ECMA 9
// Spread Operator
const libro1 = {...libro}
console.log(libro1)

// Operador Rest: spread + reduce
// Referencia a n cantidad de parametros en un array
function sumar(...num) {
  num.reduce((a,b) => a + b, 0)
}

console.log(sumar(1,2,5,4,3,6,7,8))


// ECMA 10
// String.trim() Remueve espacios innecesarios en una cadena
const nombre = " Francisco"
console.log(nombre.trim()) // "Francisco"

// Array.flat() Eliminacion de anidaciones internas (arrays y objetos)
const facturas = [20000, [40000, 22000, 5000], 9000, [70000, 3000]]

console.log(facturas.flat(2).reduce((a,b) => a+b, 0)) // El parametro 2 es la profundidad de la anidacion a eliminar

//Dynamic import
// No importar en la 1ra linea, evitas la importacion hasta que se logea
const user = true

if(user){
  import('ruta').then(contenido => console.log(contenido)) // Importacion si el user es valido
} else {
  // Agrego contenido si user no es valido
}


// ECMA 11
console.log(5 + undefined) // => Nan (Not a Number)

// Nullish Operator
console.log(facturas.map(factura => {
factura = factura ?? 0 // Si lo que esta en la izquierda es null o undefined devolveme lo de la derecha
}))

// Variables privadas
class Empleado {
  #sueldo
  cosntructor(nombre, apellido, edad, sueldo) {
    this.nombre = nombre
    this.apellido = apellido
    this.edad = edad
    this.#sueldo = sueldo  // Oculta sueldo
  }
}

// TAREA REGISTRADOR DE TICKETS DE EVENTOS