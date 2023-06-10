import {promises as fs} from 'fs';
import PM from "./ProductsManager.js"
const ProductsManager = new PM('src/models/products.txt')

class CartsManager{  
  // Execute as soon as it is instantiated
  constructor(path) {     
    this.path = path
    this.id = 0
  }

  //Crea el archivo inicializado
  createFile = async() => { 
    try{
      const voidCarts = "[]"
      await fs.writeFile(this.path,voidCarts)     
      return await this.getCarts()
    } catch (error){
      console.log("catch error: ",error)    
    }    
  } 

  // Check the file. If there is no data, create the file
  getCarts = async() => {
    try{
      const fileInformation = await fs.readFile(this.path, 'utf-8')  // Convert from JSON an Objet
      const carts = JSON.parse(fileInformation)
      // Bring back Carts
      return carts  
      
    } catch (error){        
      // if it gives an error it is because it does not exist and I believe it
      const answer = await this.createFile()
      return answer        
    }      
  } 

  // Search cart by ID
  getCartById = async(id) => {
    try{              
      const idParseInt = parseInt(id)
      if (idParseInt) {
        const carts = await this.getCarts()
  
        // If there are carts, look for any with that ID
        if (carts.length!==0){
          const cartFilter = carts.filter(element => element.id === idParseInt)

          if (cartFilter.length !== 0) {
            return cartFilter[0]
          } else {
            return "There isnt a cart with that ID"
          }
        } else {
          return "Cart dont exist"
        }
      } else {
        return "You must inform an ID"
      }
    }catch (error){
      console.log(error);
    }
  }   

  // Añade un nuevo carrito
  addCart = async() => {    
    try{  
      const carts = await this.getCarts();

      const ordCarts = carts.sort((a, b)=> { //ordena descendentemente
        if (a.id < b.id) {
          return 1;
        }
        if (a.id > b.id) {
          return -1;
        }
        return 0;
      })

      let idAux =  0 // inicializa por si el array esta vacio
      
      if (ordCarts.length !== 0) {
        idAux = ordCarts[0].id //en caso que ya exista 1 caso mueve el > id
      }
      
      const id = CartsManager.autoincrementalID(idAux);

      carts.push({"id":id,"products":[]})   
      await fs.writeFile(this.path, JSON.stringify(carts))
      return true            
  
    }catch (error){
      console.log(error);
    }
  } 

  // Add a new product to cart
  addProductInCart = async(cid,pid) => {    
    try{       
      const cidParseInt = parseInt(cid)
      const pidParseInt = parseInt(pid)

      const existCart = await this.getCartById(cidParseInt);

      if (existCart?.id){   
        const carts = await this.getCarts();
        const indexCart = carts.findIndex(element => element.id === cidParseInt) // Look for the index of the element
        
        // Recover the product with its quantities
        const product = await ProductsManager.getProductById(pidParseInt);  
        
        if (product?.id){
          if (product.stock > 0) {
            
            const indexProductCart = carts[indexCart].products.findIndex(element => element.product === pidParseInt) // Look for the index of the element
            if (indexProductCart > -1){ // This product already exists in the cart
              carts[indexCart].products[indexProductCart].quantity++
            } else {
              carts[indexCart].products.push({"product":product.id, "quantity":1})
            }                      

            await fs.writeFile(this.path, JSON.stringify(carts))
            await ProductsManager.updateProduct(pidParseInt,{"stock":(product.stock-1)});  
            return true
          } else {
            return "There is no more stock of this product to add"
          }
        } else {
          return product
        }
      } else {
        return existCart
      }   

    } catch (error) {
      console.log(error)
    }
  } 

  // Autoincrement +1 according to the id informed
  static autoincrementalID(lastId){
    return lastId + 1
  }
}

export default CartsManager




