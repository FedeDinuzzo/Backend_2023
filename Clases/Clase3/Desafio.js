class ProductManager {
  constructor() {
    this.products = []
    this.id = Product.addId() 
  }

  addProduct(newProduct) {
    if (this.products.find(newProduct => newProduct.code === this.code)) {
      return console.error("There is already a product with this code")
    } else {
      return this.products.push(newProduct)
    }
  }

  static addId() {
    if(this.idIncrement) { 
      this.idIncrement++
    } else {
      this.idIncrement = 1
    }
    return this.idIncrement
  }

  getProducts() {
    return this.products
  }

  getProductById(id) {
    if (this.products.find(product => product.id === id)) {
      return this.product
    } else {
      return console.error("Product not founded")
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
  }
}

const product1 = new Product("Iphone", "Smartphone", 1200, "insertar thumbnail" , "SKU123", 1000)
const product2 = new Product("Samsung", "Smartphone", 1100, "insertar thumbnail" , "SKU124", 950)

