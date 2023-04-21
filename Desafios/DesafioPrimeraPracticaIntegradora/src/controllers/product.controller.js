import { getManagerProducts } from "../dao/daoManager.js"

const data = await getManagerProducts()
export const managerProduct = new data.ManagerProductMongoDB

export const getProducts = async (req, res) => {
  const { limit, page, filter, sort } = req.query
  const pag = page != undefined ? page : 1
  const limi = limit != undefined ? limit : 10
  const ord = sort == "asc" ? 1 : -1
  try {
    const productos = await managerProduct.getProducts(limi, pag, filter, ord)
    if (productos) {
      return res.status(200).json(productos)
    }
    res.status(200).json({ message: "Products not found" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getProduct = async (req, res) => {
  const { pid } = req.params
  try {
    const product = await managerProduct.getElementById(pid);
    if (product) {
      return res.status(200).json(product)
    }
    res.status(200).json({ message: "Product not found" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const createProduct = async (req, res) => {
  const { title, description, price, code, stock, category, status, thumbnail } = req.body
  try {
    const product = await managerProduct.addElements([{ title, description, price, code, stock, category, status, thumbnail }])
    res.status(204).json(product)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const updateProduct = async (req, res) => {
  const { pid } = req.params
  const { title, description, code, price, status, stock, category, thumbnail } = req.body
  try {
    const product = await managerProduct.updateElement(pid, { title: title, description: description, code: code, price: price, status: status, stock: stock, category: category, thumbnails: thumbnail })
    if (product) {
      return res.status(200).json({ message: "Product updated" })
    }
    res.status(200).json({ message: "Producto not found" })
    } catch (error) { res.status(500).json({ message: error.message })
  }
}

export const deleteProduct = async (req, res) => {
  const { pid } = req.params
  try {
    const product = await managerProduct.deleteElement(pid)
    if (product) {
      return res.status(200).json({ message: "Product deleted" })
    }
    res.status(200).json({ message: "Producto not found" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}