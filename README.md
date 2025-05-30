# Gestión de Plantas y Productos Alimenticios

Este proyecto es una aplicación web full stack que permite gestionar plantas y productos alimenticios asociados. Incluye backend con Spring Boot y frontend con Angular 18 standalone.

---

## 🔧 Tecnologías utilizadas

- 📦 Backend: Java 17, Spring Boot 3.4, Maven, MySQL
- 🌐 Frontend: Angular 18, Bootstrap 5
- 🐳 Docker: MySQL + phpMyAdmin

---

## ⚙️ Requisitos previos

- Node.js >= 18.x  
- Angular CLI >= 18.x  
- Java 17  
- Maven  
- Docker y Docker Compose  

---

## 🚀 Instrucciones para ejecutar el proyecto

### 1. 🐬 Levantar MySQL y phpMyAdmin con Docker

```bash
docker-compose up -d
```

Esto creará:

- MySQL en localhost:3306
- phpMyAdmin en http://localhost:8080

###  ⚠️ Credenciales por defecto:
- Usuario: root
- Contraseña: jcbb1234
- Base de datos: db_backend_danec

## 2. ⚙️ Backend

```bash
cd backend
./mvnw spring-boot:run
```

El backend quedará disponible en:
- http://localhost:8080/api/plantas
- http://localhost:8080/api/productos

3. 🌐 Frontend
```bash
cd frontend
npm install
ng serve
```

### Funcionalidades

- CRUD de Plantas
- CRUD de Productos asociados a plantas
- Vista resumen de productos por planta en tiempo real
- Validaciones de formularios
- Uso de modales para crear y editar elementos
- Interfaz responsiva con Bootstrap

## Consideraciones

- Si se elimina una planta, también se eliminan los productos asociados del resumen.
- Se utiliza comunicación entre componentes para mantener el estado sincronizado sin recargar.


## Estructura de carpetas
```bash
.
├── backend
│   └── src/main/java/... → Spring Boot API
├── frontend
│   └── src/app → Angular standalone app
├── utils
│   └── docker-compose.yml → MySQL + phpMyAdmin
└── README.md
```
## Autor

Juan Carlos Barrera Barrera
