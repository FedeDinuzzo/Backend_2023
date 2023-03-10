import { promises as fs } from "fs"

class Product {
  constructor(title, description, price, code, stock, category, status, thumbnail,) {
    this.id = Product.addId() 
    this.title = title
    this.description = description
    this.price = price
    this.code = code
    this.stock = stock
    this.category = category
    this.status = status
    this.thumbnail = thumbnail
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

  addProduct = async (product, imgPath) => {
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
  }

  getProducts = async () => {
    try {
      const read = await fs.readFile(this.path , "utf-8")
      const data = JSON.parse(read)
      if (data.lenght !== 0) {
        return data
      }
    } catch {
      await this.createJson()
      await this.createProducts()
      return ("Initial products created")
    }
  }

  getProductsById = async (id) => {
    const read = await fs.readFile(this.path , "utf-8")
    const data = JSON.parse(read)
    const findProduct = data.find(prod => prod.id === id)
    if (findProduct) {
      return findProduct
    } else {
      return console.log('Product id not founded')
    }
  }

  updateProduct = async (id, entry, value) => {
    const read = await fs.readFile(this.path, "utf-8")
    const data = JSON.parse(read)
    const index = data.findIndex((product) => product.id === id)
    if (!data[index][entry]) {
      return console.log("Product not found")
    } else {
      data[index][entry] = value
      await fs.writeFile(this.path, JSON.stringify(data, null, 2))
      return "Product has been updated"
    }
  }

  deleteProduct = async (id) => {
    const read = await fs.readFile(this.path , "utf-8")
    const data = JSON.parse(read)
      if(data.some(prod => prod.id === parseInt(id))) {
        const prodsFiltered = data.filter(prod => prod.id !== parseInt(id))
        await fs.writeFile(this.path, JSON.stringify(prodsFiltered))
        return "Product deleted"
      } else {
        return "Product not found"
    }
  }

  async createJson() {
    await fs.writeFile(this.path, "[]")
  }

  async createProducts() {
    await this.addProduct(product1, ['../public/img/iphone.jpg'])
    await this.addProduct(product2, ['../public/img/galaxy.jpg'])
    await this.addProduct(product3, ['../public/img/pixel.jpg'])
    await this.addProduct(product4, ['../public/img/edge.jpg'])
  }
}

