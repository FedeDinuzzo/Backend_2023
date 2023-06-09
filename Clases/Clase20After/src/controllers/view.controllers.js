const PRODUCTS_URL = `http://localhost:${process.env.PORT || 5000}/api/products`
const CARTS_URL = `http://localhost:${process.env.PORT || 5000}/api/carts`

export const productView = async (req, res) => {
  const { limit , page, query, sort } = req.query

  // Creating links to prev and next pages
  const categoryLink = query ? `&query=${query}` : ""
  const limitLink = limit ? `&limit=${limit}` : ""
  const sortLink = sort ? `&sort=${sort}` : ""
  const pageLink = page ? `&page=${page}` : ""

  const response = await fetch(`${PRODUCTS_URL}?${categoryLink}${limitLink}${sortLink}${pageLink}`)
  const data = await response.json()

  const { status, payload, totalPages, prevPage, nextPage, actualPage, hasPrevPage, hasNextPage, prevLink, nextLink } = data  
  
  const booleanStatus = status === "Success" ? true : false
  
  // const sessionData = getSession(req, res)
  // const userFirst = sessionData.name
  // const userRol = sessionData.rol

  // const booleanAdmin = userRol === "admin" ? true : false

  res.render("product", { // Render the following content
    titulo: "Ecommerce Backend",    
    booleanStatus,
    payload: payload.map(product => {
      product.thumbnail = `img/${product.thumbnail}`
      return product
    }),
    totalPages,
    prevPage,
    nextPage,
    actualPage,
    hasPrevPage,
    hasNextPage,
    prevLink,
    nextLink
  })
}

export const cartView = async (req, res) => {
  const response = await fetch(`${CARTS_URL}/${req.params.cid}`)
  const data = await response.json()

  const { products } = data

  let auxProducts = []

  if (products?.length > 0){
    for (const prod of products) {
      auxProducts.push({
        title: prod.productId.title,
        description: prod.productId.description,
        price: prod.productId.price,
        quantity: prod.quantity
      })
    }
  } 

  res.render('cart', {
      auxProducts,
      cartID: products?.length > 0 ? req.params.cid : "Dont exist"
  })
}

// export const registerView = (req, res) => {
//   res.render('register')
// }


// export const loginView = (req, res) => {
//   res.render('login')
// }