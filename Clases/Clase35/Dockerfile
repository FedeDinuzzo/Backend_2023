# Establecer la imagen base
FROM node:19.4.0

# Crear y establecer el directorio de mi contenedor
WORKDIR /clase35

# Copio todos los archivos de src al directorio de trabajo
COPY src ./src
COPY package*.json .

# instalar dependencias
RUN npm install

# Puerto de app
EXPOSE 8080

# Comando para iniciar la app
CMD ["node", "src/index.js"]
# cd src
# docker build -t index.js .
# docker run -p 8080:8080 index.js .