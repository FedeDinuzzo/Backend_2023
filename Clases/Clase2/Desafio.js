class ProductManager {
  constructor() {
    this.products = []
  }

  addProduct(newProduct) {
    if (this.products.find(newProduct => newProduct.code === this.code)) {
      return console.error("There is already a product with this code")
    } else {
      this.products.push(newProduct)
      console.log("Product Added")
    }
  }

  getProducts() {
    console.log("Products:")
    console.log(this.products)
    return this.products
  }

  getProductById(id) {
    console.log("Product by id:")
    this.products.find(i => i.id === id) ? console.log(this.products.filter(i => i.id === id)) :
    console.log("Product not founded");
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
const manager = new ProductManager()

manager.getProducts()

const product1 = new Product("Iphone", "Smartphone", 1200, "insertar thumbnail" , "SKU123", 1000)
const product2 = new Product("Samsung", "Smartphone", 1100, "insertar thumbnail" , "SKU124", 950)

manager.addProduct(product1)
manager.addProduct(product2)

manager.getProductById(1)
manager.getProductById(2)

manager.getProducts()