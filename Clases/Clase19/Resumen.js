// Cookies, Sessions y Storage 2

// Session vinculo de conexion con el servidor
// El vinculo se representa con un sessionId 
// Memory Storage, si el servidor muere o se reinicia la sesion moriria con el y no se podria recuperar
// Hay que guardarla fuera del navegador

// File Storage, se guarda en un archivo
// 1 Servidor 
// 2 servidor guarda las session en archivos  
// 3 servidor muere por un momento 
// 4 servidor vuelve a funcionar
// 5 toma las sessions de los archivos y no afecta a usuarios

// Se guarda la info pero no usa ya
// No es seguro
// npm i session-file-store
// Dependencia de pruebas

// La solucion
// Guardar sessiones en la base de datos
// npm i connect-mongo
