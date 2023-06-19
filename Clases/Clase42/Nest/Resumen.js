// Framework de desarrollo NEST

// Inversion de control, el framework define los puntos de flujo
// Framework = marco de trabajo completo

// Desventajas:
// Curva de aprendizaje 
// Funcionalides que no se usan

// Usar un framework significa una gran apuesta
// Ya que con los años es mas propenso a dejar de usarse 

// NESTjs
// Server Side Application con Typescript
// Combina programacion oritentada a objetos, programacion funcional y programacion funcional reactiva
// Esta basado internamente en express, permite generar apps monoliticas y microservicios

// npm i -g @nestjs/cli
// nest new proyect-name
// npm  ->  YES

// tsconfig.json             -> Configuracion de ts
// tsconfig.build.json       -> Para testing y evitar compilaciones
// package.json              -> Instala jest - supertest - prettier - eslint
// nest-cli.json             -> Donde va a implementar la app
// .prettierrc               -> Generar idetenacion
// eslintrc.js               -> Toda la configuracion del proyecto
// Carpeta de test           -> El compilador y el test
// Carpeta src:
// app.controllers.spec.ts   -> Test de la app
// app.controller.js         -> Decorador: permite extender y modificar el comportamiento de las clases y metodos en tiempo de compilacion (no modifica estrucura interna, es una herencia mas leve)
// app.module.js             -> Conectar controlador con el servicio
// app.service.ts            -> Conexion con la db (Mongoose)
// main.ts                   -> Llama al modulo y genera el servidor

// nest start