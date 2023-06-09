// Callbacks se hacen para enviar una funcion dentro de una funcion
// Se utiliza cuando necesitas info extra o necesitas ejecutar algo antes

// Ejemplos:
document.getElementById("id").addEventListener('click', () => { })

Array.forEach(() => { })

calcularImpuestros(IVA(), PAIS(), RETENCIONES())

// Ejemplo de map con callback, retorno un valor y puedo volverlo a instanciar
Array.map(() => {})

// Callbacks convenciones:
// Siempre es el ultimo parametro
// Suele recibir 2 parametros
// La funcion llama a la callback despues de ejecutar todas sus funciones
// VER DIA POSITIVA

// Ejemplo Callbacks Anidados
const copiarArchivo = (nombreArchivo, callback) => {
  buscarArchivo(nombreArchivo, (error, archivo) => {
    if (error) {
      callback(error)
    } else {
      leerArchivo(nombreArchivo, 'utf-8', (error, texto) => {
        if (error) {
          callback(error)
        } else {
          const nombreCopia = nombreCopia + '.copy'
          escribirArchivo(nombreCopia, texto, (error) => {
            if (error) {
              callback(null)
            }
          })
        }
      })
    }
  })
}

// Esto se evita con las promesas
// PROMISE ejemplo correo
// La promesa de que en algun momento va a llegar ese paquete
// Cuando llegue no lo voy a saber
// Pero voy a saber si llega a mi domicilio o si se pierde en el camino
// Encapsula todo en la promesa

const consultarBDD = (confirmacion) => {
  return new Promise((resolve, reject) => {
    if(confirmacion) {
      resolve("Base de datos de clientes") // return implicito
    } 
    reject("Acceso denegado")
  })
}

console.log(consultarBDD(false))

// Resolver la anidacion de errores y de exitos en una Promesa
consultadBDD(false)
.then(resultado => console.log(resultado))
.catch(err => console.log(err))


// Sincronismo
// Sigo linealmente las tareas de la funcion
// Si tengo una tarea bloqueante no puede continuar la ejecucion de las proximas tareas

// Asincronismo
// Las tareas trabajan en paralelo y cada una seguira el hilo de resolucion que considere a su ritmo
// No podemos controlar cuando terminara, solo cuando comienza
// Si una tarea depende de otra habra problemas ya que la ejecucion es en paralelo
// No son bloqueantes

// FETCH
// Nos permite hacer consultas de forma sincronica sin la necesidad de crear una promesa
fetch('http://cryptoya.com/api/dolar')
.then(response => response.json())  // Paso la respuesta a json
.then(({mep, blue, solidario}) => { // Desestructurar por params
  console.log(mep, blue, solidario)
  return blue
})
.catch(error => console.log(error)) // Capturo si existe un error en las consultas

// Async / Await 
// Nos permite consultar datos a traves de funciones, evitando errores del then y el catch que encapsulan la funcion en un scoope muy chico
const consultarDolar = async () => {
  try {
      const response = await fetch('http://cryptoya.com/api/dolar')
      const dolares = await response.json()
      return dolares
  } catch (error) {
      return error
  }  
}

// Ahora el then ya no esta fijo 
// La funcion consultar dolar puede ser implementada en cualquier lugar
consultarDolar()
.then(({mep, solidario, blue}) => {
  console.log(mep, solidario, blue)
})
.catch(err => console.log(err))

// Puedo consultarlo en el codigo con el then o a traves de otra funcion async
const consulta = async () => {
  const dolares = await consultarDolar()
  const {mep} = await consultarDolar() // Podria desestructurar
  console.log(dolares, mep)
}

// Geocoding API
const API_KEY = ""

const consultarCoordenadas = async () => {
  const valores = await fetch(``)
}