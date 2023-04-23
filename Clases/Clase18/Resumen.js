// Mongo Avanzado 2

// Aggregation
// Multiples operaciones en multiples documentos
// Cuando termina una sigue la otra
// Siguen un orden logico, no son asincronicas

// Incluir stages, ejemplos:
// $count = cuenta el numero de documentos disponibles en el stage actual
// $group = agrupa los documentos en nuevos grupos segun un criterio especifico. cada grupo cuenta con un _id nuevo
// $limit = limita el numero de documentos que saldran del stage
// $lookup = permite realizar un "left join" combinacion de campos, de una coleccion de la misma BDD a los documentos de la stage actual

// Aggregation pipelines
// Principales stages:
// $set / $addFields
// $skip = agrega una nueva propiedad a los documentos que se encuentran en la stage
// $sort = devuelve solo los documentos que se encuentre despues del offset indicado
// $sort = ordena los documentos en la stage actual
// $match = devuelve solo documentos filtrados
// $merge = escribe los resultados del pipeline en una coleccion

// MongoDB configurar
// Ejemplo gestionar base de datos para una pizzeria
// Definir ventas totales de los diferentes sabores para las pizzas medianas

// Paginacion con mongoose
// dependencia: mongoose-paginate-v2
// Elegis cuantos productos se van a mostrar en cada pagina y cuantas paginas como en un libro
