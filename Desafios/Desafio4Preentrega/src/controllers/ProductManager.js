import { promises as fs, existsSync, writeFileSync } from "fs"

class Product {
  constructor(title, description, price, code, stock, category, status, thumbnail,) {
    this.title = title
    this.description = description
    this.price = price
    this.code = code
    this.stock = stock
    this.category = category
    this.status = status
    this.thumbnail = thumbnail
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

// Creating products
const product1 = new Product("Iphone", "14 Pro Max", 1500, "SKU123", 40, "phone", "true", [])
const product2 = new Product("Samsung", "Galaxy S23 Ultra", 1400, "SKU124", 30, "phone", "true", [])
const product3 = new Product("Google", "Pixel 7 pro", 1300, "SKU125", 20, "phone", "true", [])
const product4 = new Product("Motorola", "Edge 30 Ultra", 1200, "SKU126", 10, "phone", "true", [])


export class ProductManager {
  constructor(path) {
    this.path = path
  }

  checkFile = () => {
    // If the file doesn't exists, we create it. Otherwise, do nothing
    !existsSync(this.path) && writeFileSync(this.path, "[]", "utf-8");
  };

  addProduct = async (product, imgPath) => {
    this.checkFile()
    try {
      const read = await fs.readFile(this.path, "utf-8")
      const data = JSON.parse(read)
      const prodCode = data.map((prod) => prod.code)
      const prodExists = prodCode.includes(product.code)
      if (prodExists) {
        return console.log("Code already exists, change it")
      } else if (Object.values(product).includes("") || Object.values(product).includes(null)) {
        return console.log("All fields must be completed")
      } else {
        if (imgPath) {
          product.thumbnail = imgPath
        }
        const newProduct = {id: Product.addId(), ...product}
        data.push(newProduct)
        await fs.writeFile(this.path, JSON.stringify(data))
        return console.log("Product added succesfully")
      }
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
      }
    } catch {
      await this.createProducts()
      return ("Initial products created")
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

  async createProducts() {
    await this.addProduct(product1, ['../public/img/iphone.jpg'])
    await this.addProduct(product2, ['../public/img/galaxy.jpg'])
    await this.addProduct(product3, ['../public/img/pixel.jpg'])
    await this.addProduct(product4, ['../public/img/edge.jpg'])
  }
}

