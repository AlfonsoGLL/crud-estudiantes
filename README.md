#CRUD ESTUDIANTES

Proyecto CRUD para la gestión de estudiantes
Este proyecto permite crear, listar, editar y eliminar estudiantes

#El sistema está dividido en 3 partes:
.Frontend: Angular + PrimeNG
.Backend: Node.js + Express
.Base de datos: MySQL


#Tecnologías usadas:
.Angular
.PrimeNG
.Node.js
.Express
.MySQL

#Base de datos:
CREATE TABLE estudiantes(
  id INT AUTO_INCREMENT PRIMARY KEY,
  codigo VARCHAR(20) NOT NULL UNIQUE,
  nombre_completo VARCHAR(100) NOT NULL,
  carrera VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

Ejecución del proyecto:

Backend: 
cd backend
npm install
node index.js


Frontend:
npm install
ng serve


Endpoints de la API

Obtener estudiantes:
GET /estudiantes

Crear estudiantes:
POST /estudiantes:
{
  "codigo": "A001",
  "nombre_completo": "Juan Perez",
  "carrera": "Ingeniería",
  "email": "juan@mail.com"
}

Actualizar estudiante:
PUT /estudiantes/:id

Eliminar estudiante:
DELETE /estudiantes/:id
