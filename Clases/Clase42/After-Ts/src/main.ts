let nombre: string = "5"

let numero: number = 5

let suma: string = nombre + numero

console.log(suma)

// Estos son constructores con mayusculas
// No se usan para definir variables
// String
// Number
// Boolean

// A la funcion tambien le puedo definir que tipo puede devolver
const sumar = (num1:number, num2:number): number => {
  return num1 + num2
}

console.log(sumar(5, 10))

// terminal
// tsc main.ts
// Hay que configurarlo para que cuando genere el js por ejemplo sostenga las arrowfunction y no las cambie a normales
// Marca errores en el ts cuando ya generaste el js por redeclare
// Configurar para compilar al final

// Ahorarnos codigo con clases -> herencia
// Interfaces -> conectan clases lejanas 
// No se pueden generar instancias en las interfaces
// Compartir caracteristicas en comun para conectar elementos lejanos

interface Animal {
  nombre: string
  respirar(): void
}

class Catus {
  cantPatas: number
  constructor(cantPatas: number) {
    this.cantPatas = cantPatas
  }
}

class Gato extends Catus implements Animal {
  nombre: string
  constructor(nombre: string, cantPatas: number) {
    super(cantPatas)
    this.nombre = nombre
  }

  respirar(): void {
    console.log("Im a beauty cat")
  }
}

class Tiburon implements Animal {
  nombre: string

  constructor(nombre: string) {
    this.nombre = nombre
  }

  respirar(): void {
    console.log("Glu glu glu")
  }
}

const gato1: Animal = new Gato("Copito de nieve", 4)
const tiburon1: Animal = new Tiburon("Tiburoncin")

tiburon1.respirar()
gato1.respirar()

// Se puede trabajar con herencia y con clases en comun
