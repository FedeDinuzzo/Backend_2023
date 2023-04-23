import { getManagerProducts } from "../dao/daoManager.js"

const data = await getManagerProducts()
export const managerProduct = new data.ManagerProductMongoDB

export const getProducts = async (req, res) => {
  const { limit, page, filter, sort } = req.query
  const pag = page != undefined ? page : 1
  const limi = limit != undefined ? limit : 10
  const ord = sort == "asc" ? 1 : -1
  try {
    const products = await managerProduct.getProducts(limi, pag, filter, ord)
    if (products) {
      return res.status(200).json(products)
    }
    res.status(200).json({ message: "Products not found" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getProducts = async (req, res) => {  //Recupera todos los productos. puede ser limitado si se informa por URL
  const { limit , page, query, sort } = req.query
  const ValidSort = ['asc', 'desc']
  const sortOption = sort

  const filter = { stock: { $gt: 0 } } // Filtro Mongodb para traer productos con stock > 0
  query && (filter.category = query)
      
  limit || (limit = 10)  
  page  || (page  =  1)

  if (ValidSort.includes(sort)){
    sort === "asc" 
      ? sortOption = "price"
      : sortOption = "-price"

  } else if (sort !== undefined) {
    throw `Parametro invalido en el SORT: "${sort}", solo admite "asc" ó "desc"`
  }

  const options = { //Setea opciones
    page: parseInt(page),
    limit: parseInt(limit),
    sort: sortOption
  };
  
  try {
    const products = await managerProduct.paginate(filter, options);
    const queryLink = query ? `&query=${query}` : ""
    const limitLink = limit ? `&limit=${limit}` : ""
    const sortLink = sort ? `&sort=${sort}` : ""
    const prevPageLink = products.hasPrevPage ? `?page=${products.prevPage}${limitLink}${queryLink}${sortLink}` : null
    const nextPageLink = products.hasNextPage ? `?page=${products.nextPage}${limitLink}${queryLink}${sortLink}` : null
    
    const response = {
      status: "Success",
      payload: products.docs,
      totalPages: products.totalPages,
      prevPage: products.prevPage,
      nextPage: products.nextPage,
      page: products.page,
      hasPrevPage: products.hasPrevPage,
      hasNextPage: products.hasNextPage,
      prevLink: prevPageLink,
      nextLink: nextPageLink
    }  

    res.status(200).json(response)

  } catch (error) {
    res.status(500).json({
      message: error.message
    }) 
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