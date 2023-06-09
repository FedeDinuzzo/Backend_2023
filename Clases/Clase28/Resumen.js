// Arquitectura del servidor PERSISTENCIA

// Patron DAO
// Separa la logia de acceso a la fuente de datos de un archivo
// asi podemos intercambiar bases de datos sin problemas
// Usar nombres homologados para accedes a estas db, ejemplo GET

// DAO aplicado a una app real

// Admin accede a un:
// Server va a:
// Dao va a:
// partidas - IA      - Players
// TXT      - mongoDB - Postgresql

// Los datos cambian

// Admin accede a un:
// Server va a:
// Dao va a:
// SQL       - NO SQL   
// productos <-> productos (se conectan y hace que el sistema sea imperfecto pq se repiten)

// Los datos se repiten y cuando actualizas un producto debe hacerlo en ambas db


// Patron FACTORY
// Devolver lo que necesito en base a lo que requiero
// Codigo mas legible
// Esta antes del DAO


// patron DATA TRANSFER OBJECT
// DTO es una clase que transforma objectos
// 2 datos: cliente - servidor
// Factor de incertidumbre

// front: firstName - lastName
// back: fullname


// Patron Repository
// planteamiento es util para desacoplar la logica del DAO y del negocio
// contando con una capa de servicios
// añadiendo asi un nivel extra de abstraccion
// dejando cada vez mas limpio y entendible el negocio

