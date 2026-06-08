# Catálogo de Productos - Prueba Técnica

Este proyecto es una aplicación desarrollada como prueba técnica. Incluye autenticación JWT y un CRUD completo de productos con backend en ASP.NET Core y frontend en Angular.

---

#  Tecnologías utilizadas

## 🔧 Backend
- ASP.NET Core Web API
- .NET 6 / 7 / 8
- Entity Framework Core
- SQL Server
- JWT Authentication
- Swagger / OpenAPI

##  Frontend
- Angular
- TypeScript
- HttpClient
- Reactive Forms
- Interceptors HTTP
- Route Guards

---

#  Funcionalidades

##  Autenticación
- Login con usuario o email
- Validación de usuario activo
- Generación de JWT
- Guardado del token en localStorage
- Interceptor HTTP para enviar token automáticamente
- Protección de rutas con Guards

---

##  Gestión de Productos (CRUD)

- Listar productos
- Crear producto
- Editar producto
- Eliminar producto
- Validaciones:
  - Nombre obligatorio
  - Precio mayor a 0
  - Stock no negativo

---

#  Instalación del proyecto

## Backend (ASP.NET Core)

cd backend
dotnet restore
dotnet run

---

## Frontend (Angular)

cd frontend
npm install
ng serve

---

#  URLs del proyecto

## Frontend
http://localhost:4200

## Backend (Swagger)
https://localhost:7004/swagger/index.html

---

# Base de datos (Entity Framework Core - Migrations)

Este proyecto utiliza Entity Framework Core Code First con migraciones para la gestión de la base de datos.

---

## ¿Cómo se crea la base de datos?

La base de datos se genera automáticamente mediante migraciones.

### Paso 1: Aplicar migraciones

Ejecutar el siguiente comando en el proyecto backend:

```bash
dotnet ef database update

Las migraciones se encuentran en /Migrations

---

#  Usuario de prueba

Email: gonzalo@test.com  
Password: 1234

---

# Seguridad implementada

- Autenticación con JWT
- Interceptor HTTP que agrega el token automáticamente
- Guards en Angular para proteger rutas
- Endpoints protegidos en backend con [Authorize]

---

# API Endpoints

## Auth
POST /api/auth/login

## Products
GET    /api/products  
GET    /api/products/{id}  
POST   /api/products  
PUT    /api/products/{id}  
DELETE /api/products/{id}


---

# Swagger

La API está documentada en:

https://localhost:7004/swagger/index.html

Desde Swagger puedes probar:
- Login JWT
- CRUD de productos
- Endpoints protegidos

---

# Autor

Proyecto desarrollado como prueba técnica.
Gonzalo Adolfo Zupo Silveira
