# 🏥 Hospital Management System

Sistema integral para la gestión hospitalaria que permite administrar pacientes, médicos, citas, consultas, diagnósticos y facturación.  
Desarrollado con **Spring Boot (Backend)**, **React (Frontend)** y **PostgreSQL (Base de datos)**.

---

## 📁 Estructura del Proyecto

```
Hospital-System/
├── Backend-springboot/     → API REST con Spring Boot y PostgreSQL
├── Frontend-react/         → Interfaz web desarrollada con React
└── README.md               → Documentación general del proyecto
```

---

## ⚙️ Tecnologías Utilizadas

| Componente | Tecnología |
|-------------|-------------|
| **Frontend** | React + TypeScript + Bootstrap |
| **Backend** | Spring Boot (Java) |
| **Base de Datos** | PostgreSQL |
| **ORM** | JPA / Hibernate |
| **Servidor** | Tomcat embebido |
| **Control de versiones** | Git + GitHub |

---

## 🚀 Descripción General

El sistema fue desarrollado para **automatizar la gestión hospitalaria**, brindando una plataforma centralizada que optimiza los procesos de:

- Registro de pacientes y antecedentes médicos  
- Gestión de citas médicas  
- Control de médicos y especialidades  
- Registro de consultas, diagnósticos y recetas  
- Facturación de servicios médicos  

---

## 🧩 Módulos Principales

### 1. Pacientes
Administra los datos personales y clínicos de los pacientes.  
**Tablas:** `Paciente`, `HistoriaClinica`, `AntecedenteMedico`

### 2. Citas Médicas  
Permite registrar, reprogramar y cancelar citas.  
**Tablas:** `Cita`

### 3. Médicos y Especialidades  
Gestión del personal médico y sus áreas de atención.  
**Tablas:** `Medico`, `Especialidad`, `MedicoEspecialidad`

### 4. Consultas y Diagnósticos  
Registro de consultas médicas, diagnósticos y recetas.  
**Tablas:** `Consulta`, `Diagnostico`, `RecetaMedica`, `DetalleReceta`

### 5. Facturación  
Gestión de facturas y pagos por los servicios brindados.  
**Tablas:** `Factura`, `DetalleFactura`

---

## 🖥️ Instalación y Ejecución

### 🔹 Backend (Spring Boot)

1. Accede a la carpeta:
   ```bash
   cd Backend-springboot
   ```

2. Configura la conexión en `application.properties`:
   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/hospital_db
   spring.datasource.username=postgres
   spring.datasource.password=tecsup
   ```

3. Ejecuta el proyecto:
   ```bash
   mvn spring-boot:run
   ```

---

### 🔹 Frontend (React)

1. Accede a la carpeta:
   ```bash
   cd Frontend-react
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Ejecuta el servidor:
   ```bash
   npm run dev
   ```

---

## 🗄️ Base de Datos

- **Sistema:** PostgreSQL  
- **Nombre:** `hospital_db`  
- **Usuario:** `postgres`  
- **Contraseña:** `tecsup`  
- El esquema se genera automáticamente al iniciar el backend gracias a `spring.jpa.hibernate.ddl-auto=update`.

---

## 🧠 Autores del Proyecto

👩‍💻 **Yamile Ochoa**  
📘 Estudiante de Diseño y Desarrollo de Software - Tecsup  
📅 2025
