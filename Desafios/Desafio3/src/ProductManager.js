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
        console.log("This are all the products: ")
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
        console.log("The following product has been found: ")
        return findProduct
      } else {
        return console.log(`The product with the id: ${JSON.stringify(id)} has not been found`)
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

// Test
// const manager = new ProductManager("./products.json")

// const product1 = new Product("Iphone", "Smartphone", 1200, "insertar thumbnail" , "SKU123", 1000)
// const product2 = new Product("Samsung", "Smartphone", 1100, "insertar thumbnail" , "SKU124", 950)
// const product3 = new Product("Sony", "Smartphone", 1000, "insertar thumbnail" , "SKU125", 900)

// const test = async () => {
//   await manager.getProducts()
//   await manager.addProduct(product1)
//   await manager.addProduct(product2)
//   await manager.addProduct(product3)
//   await manager.getProducts()
//   await manager.getProductsById(2)
//   await manager.updateProduct(3, "title", "Nexus")
//   await manager.updateProduct(3, "stock", 1250)
//   await manager.getProducts()
//   await manager.deleteProduct(2)
//   await manager.getProducts()
// }

// test()