import { promises as fs } from 'fs'

export class ProductManager {
  constructor(path) {
    this.path = path
  }

  static incrementarID() {
    if(this.idIncrement) {
      this.idIncrement++
    } else {
      this.idIncrement = 1
    }
    return this.idIncrement
  }

  async addProduct(product,imgPath) {
    // Validates that all the fields are completed and that the "code" property is not repeated
    const read = await fs.readFile(this.path, 'utf-8')
    const data = JSON.parse(read)
    const prodCode = data.map((prod) => prod.code)
    const prodExist = prodCode.includes(product.code)
    if (prodExist) {
        return console.log (`The code ${product.code} already exisist. Please enter a different one.`)
    } else if (Object.values(product).includes("") || Object.values(product).includes(null)) {
        return console.log("All fields must be completed")
    } else {
        if (imgPath) {
            product.thumbnail = imgPath;
        } else {
            imgPath = []
            product.thumbnail = imgPath
        }
    let newID
    !data.length ? (newID = 1) : (newID = data[data.length - 1].id + 1)
    const nuevoProducto = {id: newID, ...product}
    data.push(nuevoProducto);
    await fs.writeFile(this.path, JSON.stringify(data), 'utf-8')
    console.log(`The product with ID: ${nuevoProducto.id} has been added.`)
    return newID
    }
  }

  async getProducts() {
    try {
      const prods = JSON.parse(await fs.readFile(this.path, 'utf-8'))
      return prods
    } catch(error) {
      return error
    }   
  }

  async getProductById(id) {
    const prods = JSON.parse(await fs.readFile(this.path, 'utf-8'))
    if(prods.some(prod => prod.id === parseInt(id))) {
      return prods.find(prod => prod.id === parseInt(id))
    } else {
      return "Producto not found"
    }
  }

  async updateProduct(id, {title, description, price, thumbnail, code, stock}) {
    const prods = JSON.parse(await fs.readFile(this.path, 'utf-8'))
    if(prods.some(prod => prod.id === parseInt(id))) {
      let index= prods.findIndex(prod => prod.id === parseInt(id))
      prods[index].title = title
      prods[index].description = description
      prods[index].price = price
      prods[index].thumbnail = thumbnail
      prods[index].code = code
      prods[index].stock = stock
      await fs.writeFile(this.path, JSON.stringify(prods))
      return "Product updated"
    } else {
      return "Producto not found"
    }
  }

  async deleteProduct(id) {
    const prods = JSON.parse(await fs.readFile(this.path, 'utf-8'))
    if(prods.some(prod => prod.id === parseInt(id))) {
      const prodsFiltrados = prods.filter(prod => prod.id !== parseInt(id))
      await fs.writeFile(this.path, JSON.stringify(prodsFiltrados))
      return "Product deleted"
    } else {
      return "Producto not found"
    }
  }
}