import { promises as fs, existsSync, writeFileSync } from "fs"

class Cart {
  constructor(id, products) {
    this.id = id
    this.products = products
  }
}

export default class CartManager {
  constructor(path) {
    this.path = path
  }

  checkFile = () => {
    // If the file doesn't exists, we create it. Otherwise, do nothing
    !existsSync(this.path) && writeFileSync(this.path, "[]", "utf-8");
  };

  addCart = async () => {
    this.checkFile()
    try {
      const read = await fs.readFile(this.path, "utf-8")
      let carts = JSON.parse(read)
      let newId
      carts.lenght > 0 ? newId = carts[carts.lenght - 1].id + 1 : newId = 1
      const newCart = new Cart (newId, [])
      carts.push(newCart)
      await fs.writeFile(this.path, JSON.stringify(carts))
      console.log("Cart created succesfully")
      return newId
    } catch (error) {
      error
    }
  }

  getCartById = async (idCart) => {
    this.checkFile()
    try {
      const carts = JSON.parse(await fs.readFile(this.path , "utf-8"))
      const cartIndex = carts.findIndex(cart => cart.id === idCart)
      if (carts[cartIndex]) {
        return carts[cartIndex]
      } else {
        return console.log('Cart not founded')
      }
    } catch (error) {
      error
    }
  }

  addProductToCart = async (idCart, idProduct, prodQty) => {
    this.checkFile()
    try {
      const carts = JSON.parse(await fs.readFile(this.path, 'utf-8'))
      // Verify that the cart exist with this id
      if (carts.some(cart => cart.id === parseInt(idCart))) {
        // Get the index of the carts array
        const cartIndex = carts.findIndex(cart => cart.id === parseInt(idCart))
        // Get the index of the product inside the cart
        const objectCart = new Cart(idCart, carts[cartIndex].products)
        const prodIndex = objectCart.products.findIndex(obj => obj.product === parseInt(idProduct))
        if (prodIndex === -1) {
          // If dont exists push the product to the array of products inside the cart
          objectCart.products.push({product: idProduct, quantity: prodQty})
          // Update cart in the carts array
          carts[cartIndex] = objectCart
        } else {
          // If exists increase cuantity by 1
          carts[cartIndex].products[prodIndex].quantity += prodQty
        }
        // Write the JSON of the cart with the new product
        await fs.writeFile(this.path, JSON.stringify(carts), "utf-8")
        return "Product added to cart"
      } else {
        return "There was an error by adding the product to the cart"
      }
    } catch (error) {
      error
    }
  }

  deleteCart = async (id) => {
    this.checkFile()
    try {
      const carts = JSON.parse(await fs.readFile(this.path , "utf-8"))
      if (carts.some(cart => cart.id === parseInt(id))) {
        const cartsFiltered = carts.filter(cart => cart.id !== parseInt(id))
        await writeFile(this.path, JSON.stringify(cartsFiltered))
        return "Cart deleted"
      } else {
        return "Cart not founded"
      }
    } catch (error) {
      error
    }
  }
}

deleteProductFromCart = async (idCart, idProduct) => {
  this.checkFile()
  try {
    const carts = JSON.parse(await fs.readFile(this.path, 'utf-8'))
    // Verify that the cart exists with this id
    if (carts.some(cart => cart.id === parseInt(idCart))) {
      // Get the index of the carts array
      const cartIndex = carts.findIndex(cart => cart.id === parseInt(idCart))
      const prodIndex = objectCart.products.findIndex(obj => obj.product === parseInt(idProduct))
      if (prodIndex !== -1) {
        // If exists delete the product from the cart
        const prodsFiltered = objectCart.products.filter(obj => obj.product !== parseInt(idProduct))
        // Update the cart with the array of carts
        objectCart.products = prodsFiltered
        carts[cartIndex] = objectCart
      } else {
        return "The product doesnt exists in the cart and cannot be delete"
      } 
      // Write the JSOn of the cart with the new product
      await fs.writeFile(this.parth, JSON.stringify(carts), 'utf-8')
      return "Product deleted from cart"
    } else {
      return "There was an error by deleting the prdouct from the cart"
    }
  } catch (error) {
    error
  }
}