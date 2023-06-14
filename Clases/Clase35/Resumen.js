// Clusters y Escalabilidad

// Modulo Cluster - Docker - Docker como npm

// Mejorar los servers:

// Escalamiento vertical, aumentar la capacidad fisica (servidor mas grande)
// Escalamiento horizontal, agregar nuevos nodos y dividir las tareas y la carga (en sql cuesta mucho mas esto)


// Escalabilidad horizontal
// La db principal trabaja con un servidor mas nuevo

// Clusterizar nuestro aplicativo
// Generar hilos de ejecucion para optimizar la app
// Process id - process.pid - proceso padre instancia a un hijo
// Forkeo - proceso nuevo

// generar que el proceso de artillery se divida en subprocesos
// En otra terminal
// artillery quick --count 40 --num 20 "http://localhost:4000/suma" -o reportes.json
// Genera el reporte


// DOCKER
// Virtualizar un SO con el concepto de maxima compatibilidad
// Genera Contenedores
// Engañar a nuestro SO con una maquina virtual
// Tengo todo lo que necesito en el barco para ejecutar el codigo
// Empaqueto la app y me independizo del Sistema Operativo

// PASOS de uso
// dockerfile - instrucciones para generar una imagen
// imagen equivalente a uan clase pero con un proyecto completo, multiples contenedores = a instancias
// contenedor - ejecutamos el aplicativo desde un entorno cerrado

