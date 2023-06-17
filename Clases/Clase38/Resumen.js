// Configuracion y Seguridad

// Vulnerabilidades

// Tipos:
// Hardware
// Software
// Procedimentales
// Humanas

// OWASP
// Oopen web application security proyect
// Proyecto abierto internacional
// Herramientas para hacer mas robustos los proyectos

// OWASP ZAP
// Api para testear al apliacion
// https://owasp.org/www-project-web-security-testing-guide/

// Siempre pensar: Que pasaria si...?

// OWASP Top 10
// Las 10 vulnerabilidades principales:

// A01:2021 Broken Access Control
// Se logra acceder a un recurso al cual no deberia tener acceso
// Se fuerza una URL para realizar busquedas a otros recuros
// Un usuario puede seguir navegando aun cuando token de jwt haya expirado
// Ruptura de una cookie con un token para poder elevar privilegios

// A02:2021 Cryptographic failures
// Se usa descuidadamente algun proceso criptografico (ej bcrypt)
// Se utliza algun algoritamo de cifrado obsoleto
// Cuando el proceso de hasheo tiene intervencio directa del desarrollor (SALR=10, no usar)

// A03:2021 Injection
// insercion de informacion con el fin de romper una consulta, o obtener info sencible
// La data de user no fue valdiad correctamente
// Un query dinamico sin validacion contextual
// Una peticion con parametros malintencionados para poder realizar una consulta a la db (ej inyeccion SQL o NoSQl)

// A04:2021 Insecure Desing
// No agregar 0 productos al carrito, min+1
// Suele darse en los juegos
// Aplicacion incorrecta del desing pattern atado fuertemente a la funcionalidad

// A05:2021 Security Misconfiguration
// Configuracion erronea de los elementos de arranque aplicatavio (varaibles iniciales o argumentos de entorno)
// Implementamos permisos o caracteristicas desmediad (setear el cluster de Mongo Atlas para recibir cualquier IP: 0.0.0.0/0)
// Configurar erroneamente algun cloud servide, generando inconsistencia o bloqueos en su uso (setear mal una ruta de multer)
// Configurar mal el manejo de errores y terminar mostrando el stack trace a un user (try {} catch {})

// A06:2021 Vulnerable and outdated components
// Usar dependencias Grandes con muchas descargas
// Que usen politica de actualizacion continua
// No actualizamos librerias que tienen reportadas vulnerabilidades
// Dejamos modulos con documentacion obsoleta o con features por implementar
// Actualizar un modulo sin probar si resolvia la vulnerabilidad inicial
// PORTAL DESARROLLADORES BACKEND (revisar documentacion de: ej express, node, mongoose...)

// A07:2021 Identifiaction and Authentication failures
// Forzar una autenticacion
// Nuestro sistema de login permite rupturas de fuerza bruta (intentos automatizados de logueo)
// Guardamos passwords sin hashear
// Sistema de forgot password erroneo, no recordar la pass, restablecerla directamente

// A08:2021 Software and Data integrity failures
// Alguna dependencia o integracion presenta alguna falla
// Ocurre con dependencias que actualizamos sin reviusar correcmente
// Ocurre con proceso CI/CD cuando la herramienta consigue ser vulnerada (Heroku con Github a partir de la vulnerabilidad de Travis-CI)

// A09:2021 Logging and monitoring failures
// No tenemos un sistema de monitoreo de APIs para rastrear actividad sospechose
// Mostramos logs demasiado genericos
// Mostramos logs demasiados explicitos
// Los logs quedan de forma local y no los podemos monitorear
// No hacer loggers por todo

// A10:2021 Server side request forgery (SSRF)
// El user entra a una ruta y lo redirecciona a un recurso externo
// El server no tiene un control de redirecciones o restriccion de URL por expresion regular
// Sistema interno de callbacks, los cuales pueden llevar a distintas redirecciones


// 3 Proyectos coder y analsis de vulnerabilidades
