import { paginateProducts, findProductById, createProduct, updateProduct, deleteProductServ  } from "../services/productService.js"


export const getProducts = async (req, res) => {  // Get all products, it can be limited by query
  let { limit , page, query, sort } = req.query
  const ValidSort = ['asc', 'desc']
  let sortOption = sort

  const filter = { stock: { $gt: 0 } } // Mongodb filter for getting products with stock > 0
  query && (filter.category = query)
  
  limit || (limit = 10)  
  page  || (page  =  1)

  if (ValidSort.includes(sort)){
    sort === "asc" 
      ? sortOption = "price"
      : sortOption = "-price"

  } else if (sort !== undefined) {
    throw `Invalid param at SORT: "${sort}", only "asc" or "desc"`
  }

  const options = { // Set options
    page: parseInt(page),
    limit: parseInt(limit),
    sort: sortOption
  };
  
  try {
    const products = await paginateProducts(filter, options)
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
    const response  = await findProductById(pid)   
    res.status(200).json(response)

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const postProduct = async (req, res) => { // Insert a new product
  const product = req.body  
  try {      
    const response = await createProduct(product)
    res.status(200).json(response)

  } catch (error) {
    res.status(500).json({
      message: error.message
    }) 
  }
}

export const putProduct = async (req, res) => { // Update 1 product
  const pid = req.params.pid
  const product = req.body
  try {      
      const response  = await updateProduct(pid, product)

      if (response) {
        const response  = await findProductById(pid)
        res.status(200).json(response)         
      } else {
        res.status(200).json("There isnt any product with that ID to update") 
      }
  } catch (error) {
    res.status(500).json({
      message: error.message
    }) 
  }
}

export const deleteProductCont = async (req, res) => { // Delete Product
  const pid = req.params.pid
  try {      
    const response = await deleteProductServ(pid)

    if (response) {
      res.status(200).json({
        delete: true,
        message: "Product deleted"}) 
    } else {
      res.status(200).json({
        delete: false,
        message: "There isnt any product with that ID to delete"}) 
    }
  } catch (error) {
    res.status(500).json({
      message: error.message
    }) 
  }
}