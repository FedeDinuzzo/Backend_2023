import { promises as fs, existsSync, writeFileSync } from "fs"

class ProductManager {
  constructor(path) {
    this.path = path
  }

  checkFile = () => {
    // If the file doesn't exists, we create it. Otherwise, do nothing
    !existsSync(this.path) && writeFileSync(this.path, "[]", "utf-8");
  };

  async addProduct(newProduct) {
    this.checkFile()
    try {
      let contenido = await fs.readFile(this.path, "utf-8")
      let aux = JSON.parse(contenido)
      aux.push(newProduct)
      await fs.writeFile(this.path, JSON.stringify(aux))
    } catch (error) {
      error
    }
  }

  async readProduct() {
    this.checkFile()
    try {
      
    } catch (error) {
      error
    }
  }

  async updateProduct({ title, description, price, thumbnail, code, code }) {
    this.checkFile()
    try {
      let contenido = await fs.readFile(this.path, "utf-8")
      let aux = JSON.parse(contenido)
      if (aux.some(producto => producto.id === id)) {
        let indice = aux.findIndex(Product.id === id)
        aux[indice].title = title
        aux[indice].description = description
        aux[indice].price = price
        aux[indice].thumbnail = thumbnail
        aux[indice].code = code
        aux[indice].stock = stock
        fs.writeFile(this.path, JSON.stringify(aux))
      } else {
        return "Producto no encontrado"
      }
    } catch (error) {
      error
    }
  }

  async deleteProduct() {
    this.checkFile()
    try {
      
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
const manager = new ProductManager("./products.json")

const product1 = new Product("Iphone", "Smartphone", 1200, "insertar thumbnail" , "SKU123", 1000)
const product2 = new Product("Samsung", "Smartphone", 1100, "insertar thumbnail" , "SKU124", 950)

manager.addProduct(product1)
manager.addProduct(product2)

manager.updateProduct()

