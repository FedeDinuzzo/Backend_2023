const fs = require('fs').promises

const addProduct = async(objeto) => {
  let contenido = await fs.readFile('./ejemplo.txt', "utf-8")
  let aux = JSON.parse(contenido)
  aux.push(objeto)
  await fs.writeFile('./ejemplo.txt', JSON.stringify(aux))
}

// Read product es igual al add pero usas un find y devuelvo el resultado

const producto1 = {nombre: "pepas", marca: "pepin", id: 1}
const producto2 = {nombre: "helado", marca: "ice", id: 2}

// addProduct(producto1).then(() => addProduct(producto2))

// Mejor opcion:
const test = async() => {
  await addProduct(producto1)
  await addProduct(producto2)
}

test()

// array.filter(producto => producto.id !=== idIngresado)

const updateProducto = async ({ nombre, marca, id }) => {
  let contenido = await fs.readFile('./ejemplo.txt', "utf-8")
  let aux = JSON.parse(contenido)
  if(aux.some(producto => producto.id === id)) {
    let indice = aux.findIndex(producto.id === id)
    aux[indice].nombre = nombre
    aux[indice].marca = marca
    fs.writeFile('./ejemplo.txt', JSON.stringify(aux))
  } else {
    return "Producto no encontrado"
  }
}

updateProducto()