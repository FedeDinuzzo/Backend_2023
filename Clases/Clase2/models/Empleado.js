// HERENCIA
// Clase en js
class Empleado {
  constructor(nombre, apellido, edad, dni, sueldo) {
    this.nombre = nombre
    this.apellido = apellido
    this.edad = edad
    this.dni = dni
    this.sueldo = sueldo
  }

  // Metodo
  aumentarSueldo(porcentaje) {
    this.sueldo *= porcentaje // this.sueldo *= 1.20 => aumento 20%
  }
}

export class Junior extends Empleado {
  constructor(nombre, apellido, edad, dni, sueldo) {
    super(nombre, apellido, edad, dni, sueldo) // Llamo al constructor de la clase padre o superclase
    this.proyectosAsignados = []
  }

  asignarProyecto(nuevoProyecto) {
    this.proyectosAsignados.push(nuevoProyecto)
  }
}

export class SemiSenior extends Empleado {
  constructor(nombre, apellido, edad, dni, sueldo, antiguedad) {
    super(nombre, apellido, edad, dni, sueldo)
    this.antiguedad = antiguedad
    this.ProyectosCoordinados = []
    this.proyectosAsignados = []
  }

  asignarProyecto(nuevoProyecto) {
    this.proyectosAsignados.push(nuevoProyecto)
  }

  coordinarProyecto(nuevoProyecto) {
    this.ProyectosCoordinados.push(nuevoProyecto)
  }

  aumentarSueldo(porcentaje) {
    this.sueldo *= porcentaje + (0.05 * this.antiguedad)
  }
}

export class Senior extends Empleado {
  constructor(nombre, apellido, edad, dni, sueldo, antiguedad) {
    super(nombre, apellido, edad, dni, sueldo)
    this.antiguedad = antiguedad
    this.ProyectosCoordinados = []
    this.clientes = []
  }

  coordinarProyecto(nuevoProyecto) {
    this.ProyectosCoordinados.push(nuevoProyecto)
  }

  aumentarSueldo(porcentaje) {
    this.sueldo *= porcentaje + (0.1 * this.antiguedad)
  }

  AgregarCliente(nuevoCliente) {
    this.clientes.push(nuevoCliente)
  }
}