// ROXY y NGINX
// Orquestacion de contenedores

// DockerHub 
// Repositorio de imagenes en la nube
// Obtener Docker ID
// Las imagenes pesan mucho dada la maxima compatibilidad
// App - imagenes
// Local - Hub

// docker login (en la consola)
// docker tag index.js fededi/index.js:1.0.0
// docker push fededi/index.js:1.0.0


// Kubernetes (orquestador)
// Toma un conjunto de instrucciones y las ejecuta para distribuir pods
// cada pod tiene n contenedores, funcionando asi como entidadess unicas para intercomunicarse

// kubectl (comandos cli)
// para instalar escribir en cmd:
// curl.exe -LO "https://dl.k8s.io/release/v1.25.0/bin/windows/amd64/kubectl.exe"
// kubectl version

// Complemento de kube
// Minikube (pruebas en local)
// Instalar: https://minikube.sigs.k8s.io/docs/start/

// cmd: minikube start



// Usar .env en docker
// ver en clase35 Dockerfile

// docker build --build-arg ENV_FILE
// docker build --build-arg ENV_FILE=.env.production -t test:production .