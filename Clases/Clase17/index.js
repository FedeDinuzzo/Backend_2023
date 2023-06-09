import mongoose from "mongoose"
import orderModel from "./models/order.js"

const main = async () => {
  await mongoose.connect("mongodb+srv://federicodinuzzo98:coderhouse@cluster0.rae3wln.mongodb.net/?retryWrites=true&w=majority")
  
  const resultados = await orderModel.paginate({size: "medium"}, {limit: 2, page: 1})
  // const resultados = await orderModel.aggregate([
  //   {
  //     // Buscar pizzas en tamaño mediano
  //     $match: {size: "medium"}
  //   }, 
  //   {
  //     // Agrupar pizzas por sabor
  //     $group: {_id: "$name", totalQuantity: {$sum: "$quantity"}, totalPrice: {$sum: "$price"}}
  //   },
  //   { 
  //     // 1 si es menor a mayor, -1 si es mayor a menor
  //     // Generar un reporte de cada dia ordenando, agrupando y guardandolo para subirlo a atlas
  //     $sort: {totalQuantity: -1}
  //   },
  //   {
  //     // $$ROOT guarda toda la info
  //     $group: {_id: 1, orders: {$push: "$$ROOT"}}
  //   }, 
  //   {
  //     // Lo guardamos por dia
  //     $project: {
  //       "_id": 0,
  //       orders: "$orders"
  //     }
  //   },
  //   {
  //     // Lo subimos a la BDD
  //     $merge: {
  //       into: "reports"
  //     }
  //   }
  // ])
  console.log(resultados)
  // await orderModel.insertMany([
  //   {name:"Napolitana", size:"small", price:"2500", quantity:"2"},
  //   {name:"Cuatro quesos", size:"medium", price:"3000", quantity:"2"},
  //   {name:"Jamon y morrones", size:"large", price:"2100", quantity:"1"},
  //   {name:"Champignones", size:"medium", price:"1800", quantity:"1"},
  //   {name:"Capresse", size:"small", price:"3600", quantity:"2"},
  //   {name:"Peperoni", size:"large", price:"4000", quantity:"2"},
  //   {name:"Napolitana", size:"medium", price:"3000", quantity:"2"},
  //   {name:"Anchoas", size:"large", price:"2500", quantity:"1"},
  //   {name:"Cuatro quesos", size:"small", price:"4000", quantity:"3"},
  //   {name:"Fugazzeta", size:"large", price:"2300", quantity:"1"},
  //   {name:"Jamon y morrones", size:"small", price:"1750", quantity:"1"},
  //   {name:"muzarella", size:"medium", price:"2900", quantity:"2"},
  // ])
}

main()