// import { promises as fs } from 'fs'
const fs = require('fs').promises

const productos = [
  {
  id: 1,
  nombre: "papas fritas",
  marca: "Lays",
  precio: 450,
  codigo: "#5050",
  stock: 40,
  ruta: "img",
  description: "muy ricas",
  },
  {
    id: 2,
    nombre: "papas al horno",
    marca: "Ndea",
    precio: 50,
    codigo: "#5051",
    stock: 30,
    ruta: "img",
    description: "muy ricardas fort",
  },
]

const consultasTXT = async(ruta) => {
  await fs.writeFile(ruta, " ")
  let contenido = await fs.readFile(ruta, "utf-8")
  console.log(contenido)
  await fs.appendFile(ruta, JSON.stringify(productos)) // Pasar de objeto a JSON

  contenido = await fs.readFile(ruta, "utf-8")
  let aux = JSON.parse(contenido)

  const producto1 = {nombre: "pepas", marca: "pepin"}
  aux.push(producto1)
  await fs.writeFile(ruta, JSON.stringify(aux))
  // JSON.parse(contenido) = await fs.readFile(ruta, "utf-8") // Analiza una cadena de texto como JSON
  // console.log(contenido)
  // await fs.unlink(ruta)
}

consultasTXT('./ejemplo.txt')