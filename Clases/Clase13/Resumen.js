// MongoDB

// Base de datos
// Relacionales:
// Oracle - MySQL - MariaDB - SQLite3 
// Estructura, dependencia y de cambio controlado, las tablas se relacionan

// No Relacionales:
// Firestore - Redis - MongoDB - DynamoDB
// Estructura, con relaciones y dependencias mas flexibles y de cambios sumamente rapidos

// El gran problam de la persistencia: archivos
// Se migro se archivos a bases de datos
// Son mas seguras - Segmentacion de datos
// Filtrar - Ordenar - Buscar datos especificos - Actualizar un conjunto de datos sin afectar o tocar otros datos

// MongoDB 
// Orientada a documentos
// Utiliza colecciones
// Cada coleccion puede tener diferente estructura
// Puede utilizarse local o en la nube


// Instalacion de MongoDB
// Instalacion de Mongosh
// Ver Postgresql

// cmd mongosh
// show dbs
// use firstBDD     si no existe la crea y accede
// db.createCollection("users")      { ok: 1 } seria verdadero
// db.users.insertOne({nombre: "Federico", apellido: "Di Nuzzo", email: "fede@dinu.com"})      Genera un id unico
// db.users.find()