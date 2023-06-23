// Frameworks de desarrollo Nest.js Parte 2

// Nestjs + MongoDB
// Al ser Nest un entorno cerrado
// Nest proporciona un modulo interno de compatibilidad con mongoose
// npm i @nestjs/mongoose mongoose
// Conectamos con app.module.js clase
// nest g resource users 
// Crear el esquema de users
// schema - users.schemas.ts
// Defino el schema y defino el modelo del schema
// UserSchema
// Elimino los + en los id del CRUD de users.controller.js, agrego id:string
// Modificar users.service.ts

// Para implementar middlewares - exampleMiddleware.ts
// Modulos para usar variables de entorno
// npm i @nestjs/config
// Consultamos en app.module.ts