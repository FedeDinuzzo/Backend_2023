// CRUD en MongoDB

// Utiliza:
// Formato BSON - permite tener datos binarios
// Nosotros enviaremos datos JSON y se almacenan en BSON

// CREATE - READ - UPDATE - DELETE

// show dbs
// use <db name>
// db
// show collections
// db.createCollection(name)
// db.dropDatabase()
// db.collection.drop()

// db.collection.insertOne()
// db.collection.insertMany([{}, {}])
// db.collection.find()
// db.collection.find().pretty    Lo hace mas bonito
// db.collection.findOne({nombre: "Feder"})
// db.collection.estimatedDocumentCount()
// db.collection.countDocuments(opt)


// cls = Limpiar consola


// FILTROS

// db.coll.find({key:{$operator: val}})
// Ejemplo: 
// db.users.find({$or: [{nombre: "Feder"}, {nombre: "Federico"}]})

// $and
// $or
// $lt   menores
// $lte  menos o iguales
// $gt   mayores
// $gte  mayores o iguales
// $ne   distinto
// $eq   igual

// mongodb.com/docs/manual/reference/operator/query/


// BUSQUEDA AVANZADA

// db.coll.distinct( val )
// Devuelve un array con los distintos valores que toma un determinado campo en los documentos de la colección.

// db.coll.find({doc.subdoc:value})
// Se utiliza para filtrar subdocumentos.

// db.coll.find({name: /^Max$/i})
// Filtra utilizando expresiones regulares


// PROYECCIONES, SORTS, SKIPS, 

// db.users.find(query, projections) 
// Ejemplo
// db.users.find({},{nombre:1}) 
// 0 todos menos el nombre
// true 

// db.collection.find().sort({val_A:1,val_B:-1})
// Ejemplo
// db.users.find().sort()   Ordena por el ID
// db.users.find().sort({sueldo:1, sueldo:-1})   Ordena de mayor a menor

// db.users.find().limit(2) 
// skip(offset)   Omite el numero de documentos indicados, paginaciones, ignorar valores que no son necesarios


// CRUD - UD
// UPDATE Y DELETE

// db.collection.updateOne(query,update,option)
// Ejemplo
// db.users.updateOne({"_id": ObjectId("63fe8072f4067aad12679e7e")}, {$set: {sueld: 60001}})

// db.collection.updateMany(query,update,option)
// db.users.updateMany({sueldo: 9000}, {$set: {sueldo: 10000}})

// db.collection.deleteOne({key:val})
// Ejemplo
// db.users.deleteOne({_id:ObjectId("63fe8072f4067aad12679e7f")})

// db.collection.deleteMany({key:val})   si lo pasas vacio borra toda la coleccion


// MODIFICAR EL NOMBRE DE LA KEY EN VEZ DEL VALOR
// HAY QUE VER MONGOOSE ESQUEMAS Y ESTRUCTURAS