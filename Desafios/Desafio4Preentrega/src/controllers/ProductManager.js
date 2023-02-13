import { promises as fs, existsSync, writeFileSync } from "fs"

export default class ProductManager {
  constructor(path) {
    this.path = path
  }

  checkFile = () => {
    // If the file doesn't exists, we create it. Otherwise, do nothing
    !existsSync(this.path) && writeFileSync(this.path, "[]", "utf-8");
  };

  addProduct = async (newProduct) => {
    this.checkFile()
    try {
      let contenido = await fs.readFile(this.path, "utf-8")
      let aux = JSON.parse(contenido)
      aux.push(newProduct)
      await fs.writeFile(this.path, JSON.stringify(aux))
      console.log("Product added succesfully")
    } catch (error) {
      error
    }
  }

  getProducts = async () => {
    this.checkFile()
    try {
      const read = await fs.readFile(this.path , "utf-8")
      const data = JSON.parse(read)
      if (data.lenght !== 0) {
        return data
      } else {
        return console.log(`The path ${this.path} has no products`)
      }
    } catch (error) {
      error
    }
  }

  getProductsById = async (id) => {
    this.checkFile()
    try {
      const read = await fs.readFile(this.path , "utf-8")
      const data = JSON.parse(read)
      const findProduct = data.find(prod => prod.id === id)
      if (findProduct) {
        return findProduct
      } else {
        return console.log('Product id not founded')
      }
    } catch (error) {
      error
    }
  }

  updateProduct = async (id, entry, value) => {
    this.checkFile()
    try {
      const read = await fs.readFile(this.path, "utf-8")
      const data = JSON.parse(read)
      const index = data.findIndex((product) => product.id === id)
      if (!data[index][entry]) {
        return console.log("Product not found")
      } else {
        data[index][entry] = value;
        await fs.writeFile(this.path, JSON.stringify(data, null, 2));
        console.log("Product has been updated to: ")
        return console.log(data[index]);
      }
    } catch (error) {
      error
    }
  }

  deleteProduct = async (id) => {
    this.checkFile()
    try {
      const read = await fs.readFile(this.path , "utf-8")
      const data = JSON.parse(read)
      const deletedProduct = JSON.stringify(data.find(prod => prod.id === id))
      const newData = data.filter(prod => prod.id !== id)
      await fs.writeFile(this.path, JSON.stringify(newData), "utf-8")
      console.log("The following product has been deleted: ")
      return console.log(deletedProduct)
    } catch (error) {
      error
    }
  }
}  

class Product {
  constructor(title, description, price, thumbnail, code, stock) {
    this.title = title
    this.description = description
    this.price = price
    this.thumbnail = thumbnail
    this.code = code
    this.stock = stock
    this.id = Product.addId() 
  }

  static addId() {
    if(this.idIncrement) { 
      this.idIncrement++
    } else {
      this.idIncrement = 1
    }
    return this.idIncrement
  }
}