CREATE DATABASE clivet;

USE clivet;

CREATE TABLE cliente(
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    ci VARCHAR(8) NOT NULL,
    nombre VARCHAR(40) NOT NULL,
    apellido VARCHAR(40) NOT NULL,
    correo VARCHAR(50) UNIQUE,
    telefono VARCHAR(11),
    direccion VARCHAR(100),
    registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    eliminado INT DEFAULT 0
);

CREATE TABLE medico(
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    ci VARCHAR(8) NOT NULL,
    nombre VARCHAR(40) NOT NULL,
    apellido VARCHAR(40) NOT NULL,
    correo VARCHAR(50) UNIQUE,
    telefono VARCHAR(11),
    direccion VARCHAR(100)
);

CREATE TABLE mascota_historia(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(40) NOT NULL,
    tipo VARCHAR(5) NOT NULL,
    raza VARCHAR(50),
    edad INT,
    tamano FLOAT,
    peso FLOAT,
    descripcion VARCHAR(100),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    antecedentes VARCHAR(200),
    id_cliente INT NOT NULL,
    eliminada INT DEFAULT 0,
    FOREIGN KEY (id_cliente) REFERENCES cliente(id)
    ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE consulta(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    fecha DATE NOT NULL,
    hora TIME NOT NULL,
    estado VARCHAR(20),
    descripcion VARCHAR(50),
    id_mascota INT NOT NULL,
    id_medico INT NOT NULL,
    eliminada INT NOT NULL,
    FOREIGN KEY (id_mascota) REFERENCES mascota_historia(id)
    ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_medico) REFERENCES medico(id)
    ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE detalle_historia(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    descripcion VARCHAR(4000),
    id_historia INT NOT NULL,
    eliminado INT NOT NULL,
    FOREIGN KEY (id_historia) REFERENCES mascota_historia(id)
    ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE examen(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    tipo VARCHAR(40),
    descripcion VARCHAR(200),
    id_mascota INT NOT NULL,
    id_detalle INT NOT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_mascota) REFERENCES mascota_historia(id)
    ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_detalle) REFERENCES detalle_historia(id)
    ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE tratamiento(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    medicamento VARCHAR(100),
    aplicacion VARCHAR(300),
    observacion VARCHAR(300),
    id_mascota INT NOT NULL,
    id_detalle INT NOT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_mascota) REFERENCES mascota_historia(id)
    ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_detalle) REFERENCES detalle_historia(id)
    ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE vacunas(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id_mascota INT NOT NULL,
    FOREIGN KEY (id_mascota) REFERENCES mascota_historia(id)
    ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE usuarios(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    usuario VARCHAR(50),
    contra VARCHAR(100),
    nombre VARCHAR(40) NOT NULL,
    apellido VARCHAR(40) NOT NULL,
    tipo VARCHAR(20) NOT NULL
);