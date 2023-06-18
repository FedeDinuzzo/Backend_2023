// Testing Unitario

// Mocha + Chai

// Mi app ya funciona y ahora que? testing
// Reducir la capacidad de errores
// Incremento en el conocimiento del codigo desarrollado
// Descubrimiento de puntos ciegos en el codigo
// Posibilidad de refactoring

// Mocha es un framework de testing hecho para node js
// Instalarlo en el entorno, lo probaremos con el proyecto de la clase previa

// Assert            Validaciones de manera estrictas
// archivo.test.js   El contexto de testing
// describe          Funcion para definir distintos contextos de testeo
// it                Unidad minima de nuestro testing, definimos la accion de consulta y de destino
// before            Inicializa elementos antes de comenzar con todo el contexto de testeo
// beforeEach        Antes de comenzar cada test dentro de un contexto en particular
// after             = before pero dsps
// AfterEach         = beforeEach pero dsps

// La diferencia con postman es que si no hay rutas no puede probar la app
// Mocha y chai fingen un flujo normal en el proyecto

// NO SE HACE TESTING EN PRODUCCION

// Carpeta:        test
// Archivo:        User.test.js
// package.json:   "test": "mocha test/User.test.js


// Chai - libreria de assertions, comparaciones mas claras

// to         Conector inicial para armar frase
// be         Identificar elemento en particular
// have       Que valor tenga algo
// and        Encadenar validaciones
// not        Realizar una negacion
// deep       Evaluaciones profundas
// equal      Comparacion de igualdad
// property   Apuntar a alguna propiedad de un objeto


// Formas de hacer testing con js
// cucumber / mocha / jasmin
