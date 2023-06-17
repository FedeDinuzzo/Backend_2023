// Tercera Practica Integradora

// Arquitectura por capas
// Modelo - Servicios - Controlador - Ruta

// Capa de presentacion (frontend)
// Capa navegador (api)
// Capa servicio (Logica negocio)
// Capa db

// Desing patterns (not needed)
// Mensajeria (mailing )
// Entornos de ejecucion - Docker - .env.prod .env.dev



// ENTREGA 30/5 AGREGAR: 

// Restablecer password 
// Cookie email expira en 1 hora
// No podes restablecer con la misma pass
// Vista que vuelve a generar el link si expiro

// Rol "premium" (crea productos)
// Product Schema add campo owner (referencia quien creo el producto)
// Rol "premium" (elimina productos que le pertenecen)
// Rol "admin" (elimina cualquier producto)



// Orquestacion de contenedores
// Optimiza la ejecucion de los contenedores
// Podes darle horarios de ejecucion automaticos

// Orquestacion con Kubernetes
// Tipo de orquestador
// Trabajamos con minikube

// abrir docker desktop
// cmd
// minikube start
// kubectl cluster-info
// aparece el contenedor de minikube en docker

// Comando utilizados comunmente:
// (gets - apply - edit - delete - config)
// kubectl get pods
// kubectl get deployments
// kubectl get services

// Generamos el archivo de configuracion
// En la clase 35
// No debe subirse al github

// kubeusers.yaml
// desde la clase35 en consola:
// kubectl apply -f kubeusers.yaml
// kubectl get deployments
// kubectl get services
// kubectl get pods
// minikube service list
// minikube service kubeservice