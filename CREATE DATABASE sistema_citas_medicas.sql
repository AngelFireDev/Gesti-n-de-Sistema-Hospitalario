-- CREAR BASE DE DATOS
CREATE DATABASE sistema_citas_medicas;

USE sistema_citas_medicas;

-- =========================
-- TABLA USUARIOS (LOGIN)
-- =========================
CREATE TABLE usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    rol ENUM('admin', 'recepcionista', 'medico', 'paciente') DEFAULT 'paciente',
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- TABLA PACIENTES
-- =========================
CREATE TABLE pacientes (
    id_paciente INT AUTO_INCREMENT PRIMARY KEY,
    documento VARCHAR(20) UNIQUE NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    fecha_nacimiento DATE,
    genero ENUM('Masculino', 'Femenino', 'Otro'),
    telefono VARCHAR(20),
    direccion VARCHAR(255),
    email VARCHAR(150),
    tipo_sangre VARCHAR(5),
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- TABLA MEDICOS
-- =========================
CREATE TABLE medicos (
    id_medico INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    especialidad VARCHAR(100),
    telefono VARCHAR(20),
    email VARCHAR(150),
    consultorio VARCHAR(50),
    estado ENUM('Activo', 'Inactivo') DEFAULT 'Activo'
);

-- =========================
-- TABLA HOSPITALES
-- =========================
CREATE TABLE hospitales (
    id_hospital INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    direccion VARCHAR(255),
    telefono VARCHAR(20),
    ciudad VARCHAR(100),
    estado ENUM('Activo', 'Inactivo') DEFAULT 'Activo'
);

-- =========================
-- TABLA CITAS MEDICAS
-- =========================
CREATE TABLE citas_medicas (
    id_cita INT AUTO_INCREMENT PRIMARY KEY,
    id_paciente INT NOT NULL,
    id_medico INT NOT NULL,
    id_hospital INT,
    fecha DATE NOT NULL,
    hora TIME NOT NULL,
    motivo TEXT,
    estado ENUM(
        'Pendiente',
        'Confirmada',
        'Cancelada',
        'Finalizada'
    ) DEFAULT 'Pendiente',

    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (id_paciente)
        REFERENCES pacientes(id_paciente),

    FOREIGN KEY (id_medico)
        REFERENCES medicos(id_medico),

    FOREIGN KEY (id_hospital)
        REFERENCES hospitales(id_hospital)
);

-- =========================
-- TABLA HISTORIAL MEDICO
-- =========================
CREATE TABLE historial_medico (
    id_historial INT AUTO_INCREMENT PRIMARY KEY,
    id_paciente INT NOT NULL,
    diagnostico TEXT,
    tratamiento TEXT,
    observaciones TEXT,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (id_paciente)
        REFERENCES pacientes(id_paciente)
);

-- =========================
-- DATOS DE PRUEBA
-- =========================

INSERT INTO usuarios
(nombre, apellido, email, password, rol)
VALUES
('Admin', 'Sistema', 'admin@hospital.com', '123456', 'admin');

INSERT INTO pacientes
(documento, nombre, apellido, fecha_nacimiento, genero, telefono, direccion, email, tipo_sangre)
VALUES
('123456789', 'Juan', 'Perez', '1995-05-10', 'Masculino', '3001112233', 'Calle 1', 'juan@gmail.com', 'O+');

INSERT INTO medicos
(nombre, apellido, especialidad, telefono, email, consultorio)
VALUES
('Ana', 'Gomez', 'Pediatria', '3005556677', 'ana@hospital.com', '201');

INSERT INTO hospitales
(nombre, direccion, telefono, ciudad)
VALUES
('Hospital Central', 'Av Principal 123', '6011234567', 'Bogotá');

INSERT INTO citas_medicas
(id_paciente, id_medico, id_hospital, fecha, hora, motivo)
VALUES
(1, 1, 1, '2026-06-10', '10:30:00', 'Control general');