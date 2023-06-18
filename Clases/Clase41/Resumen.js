// Testing avanzado
// supertest 
// testing a rutas / session / subida de imagenes

// (Testing de caracter funcional)
// Trabajo paso a paso pero resume la info

// Test unitario vs Test integracion

// UNITARIO:
// Sirven para no tener que regresar a revisar los detalles mas chicos
// No lo usamos

// INTEGRACION:
// Ejemplo: Dao, Bcrypt, Test de integracion

// Funcionalidades con SUPERTEST
// Libreria que permite ejecutar peticiones HTTP al server
// No reemplaza a postman, ya que supertest esta mas ligada al proyecto de node.js

// A veces el test pasa aunque de error, porque a nivel de ruta puede funcionar bien, pero estar mal enviado un dato
// Ejemplo no enviamos en un post un dato required