// Arquitectura de capas

// Una capa es cada rol (por ejemplo rol routes)
// Capa de presentancion (routers)
// Capa de dominio (controllers)
// Capa de acceso a datos (models)
// Capa de soporte comun a las otras 3

// Capa base
// modelo - vista - controlador
// No hay comunacion directa entre la vista y el modelo siempre esta el controlador como mediador


// Capa de persistencia o modelo es la mas interna
// Se cominica con la db y solo conoce esa info, no conoce ni las rutas
// Operacion de tipo CRUD
// En modelos mas complejos podrian tener Agregaciones o el DAO

// Capa de negocio o controlador es una logica para enviar una solicitud al modelo
// Intermedia entre la ruta y el modelo, no permitir informacion no valida

// Capa de renderizado o de vista, son las rutas que conoce el cliente
// Envia las solicitudes y recibe las informacion que corresponda

// Como cliente no podes saber lo que sucede internamente, solo conoces la capa exterior (como en una cebolla)


// La idea es conectar a la capa mas externa un frontend con react

// Capas adicionales para node js
// Capa de routing

// Los componentes se conectan a la bd con una conexion async
// No toda la app se conecta solo algunos componentes:
// products - product - register - login - cart

// Frontend              Backend
// Login --------------> routerSession ---> controllerSession -----> controller ------------> model
// Register -----------> up                 down ---> config - utils - passport - bcrypt ---> up
// Sacarle responsabilidad al controller -----------> servicios (service)
// De esta manera por ejemplo un fallo en controller no afecta al modelo, afecta al servicio pero el servicio puede trabajar de otras formas con el controller

// FINALMENTE
// La ruta recibe lo que solicita el usuario
// Se lo envia al controlador y este llama a una funcion del servicio
// Service recibe esa info y se conecta con el modelo
// Al final el controlador no conoce al modelo

// De esta manera se puede hacer un DAO mas simple
// Se divide el bakcend en 2 (ruta, controller)(service, modelo)
