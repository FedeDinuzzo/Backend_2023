// Proceso princiapl del servidor + Global & Child process

// Process
// Uso de memoria - Id del preoceso en el SO - Que SO - Que entorno - Que argumentos tiene

// process.cwd - directorio actual del proceso
// process.pid - id del proceso en sistema
// process.MemoryUsage()
// process.env - accede al objeto del entorno actual
// process.argv - muestra los argumentos pasados por CLI
// process.version - version del proceso en node
// process.on() - permite setear un listener de eventos
// process.exit() - permite salir del proceso

// Argumentos en consola 
// Terminal npm init --yes
// Crear server.js
// console.log(process.argv)
// Por defecto manda un array con 2 rutas, directorio de node y directorio actual
// Si hago => node server.js 2 3 4
// Los agrupa:
// 'c\user...',
// 'c\user...',
// '2',
// '3',
// '4'
// Si los consulto: console.log(process.argv.slice(2))
// Devuelve: solo devuelve los argumentos sin los directorios
// Si los consulto: console.log(process.argv.slice(2)[2])
// Devuelve: 4

// Procesamiento de argumentos con Commander
// convierte flags en booleans, limita las flags y coloca argumentos predetermiandos
// npm i commander

// Codigo mas complejo en las consultas con commander
// Una flat es una descripcion de un valor


// Manejo de variable de entorno
// Develop - Staging - Production
// se pueden necesitar mas o menos variables o que cambien sus valores
// Cambian segun el entorno
// npm i dotenv

// Archivo config

// Listeners
// on - espera un mensaje a algo que cambie para ejecutar una accion
// on 'exit'
// on 'uncaughtException'
// on 'message'

// Codigos de salida de proceso
// 0: proceso finalizado normalmente
// 1: proceso finalizado por excepcion fatal
// 5: error fatal del motor V8
// 9: para argumentos invalidos al momento de la ejecucion


// Child process
// Divide y venceras (react)
// node lo hace automaticamente