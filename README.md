## CliVet

Sistema de control de consultas veterinarias:

- Inicio con estadisticas generales.
- Sección de clientes.
- Sección de mascotas (Un cliente puede tener varias mascotas).
    - Visualización e inserción de las vacunas de la mascota.
    - Visualización de los detalles por consulta de la historia de la mascota.
- Sección de consultas.
    - La ventana inicial muestra todas las consultas, asi como también las consultas de hoy.
    - Visualización e inserción de las vacunas de la mascota.
    - Visualización e inserción de los detalles por consulta de la historia de la mascota.
- Sistema de login. (Posee usuarios con niveles)

## Instalaciones requeridas

- `Requisito general`.
    - [Nodejs](https://nodejs.org/es/).
    - [Gestor de base de datos](https://www.apachefriends.org/es/index.html), En este caso usamos MySQL/MariaDB que trae XAMPP.

- `Frontend`.
    - Para realizar la instalación debe abrir la carpeta `frontend` en el terminal/cmd.
    - Instalación mediante npm (npm es el gestor de paquetes de Nodejs): 
        - Angular CLI: `npm install -g @angular/cli` (Si desea tener Angular de manera global).
        - `npm install` (Instala todos los paquetes adicionales usados, Ej: `ng2-charts`). 

- `Server`.
    - Para realizar la instalación debe abrir la carpeta `server` en el terminal/cmd.
    - Instalación mediante npm (Gestor de paquetes de Nodejs): 
        - `npm install` (Instala todos los paquetes adicionales usados, Ej: `express, mysql`). 

## Ejecución de la aplicación

- `Frontend`.
    - Para realizar la instalación debe abrir la carpeta `frontend` en el terminal/cmd.
    - Comandos más usados disponibles (ng es el comando usado por Angular):
        - `ng serve`: Inicia la aplicación en `localhost:4200`.
        - `ng buil --prod`: Crea tu aplicación para producción. 

- `Server`.
    - Para realizar la instalación debe abrir la carpeta `server` en el terminal/cmd.
    - Comando para iniciar la API que hace las consultas a la base de datos:
        - `npm start`: Inicia el servidor de la API en `localhost:3000`.
