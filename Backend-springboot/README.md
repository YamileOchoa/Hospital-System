# 🏥 Hospital Management System

## 📘 Descripción General
El **Sistema de Gestión Hospitalaria** tiene como finalidad **administrar de manera integrada los procesos del hospital**, abarcando la atención de pacientes, control de médicos, programación de citas, consultas médicas, facturación y almacenamiento de información clínica.

El sistema fue desarrollado con **Spring Boot** para el backend y **PostgreSQL** como sistema gestor de base de datos.  
Permite automatizar tareas críticas del hospital y mantener la información médica de manera segura, eficiente y centralizada.

---

## ⚙️ Tecnologías Utilizadas
| Componente | Tecnología |
|-------------|-------------|
| Lenguaje backend | Java 17 |
| Framework | Spring Boot |
| Base de datos | PostgreSQL |
| ORM | JPA / Hibernate |
| Puerto por defecto | `9090` |

---

## 🧩 Módulos Implementados

### 🧍‍♂️ 1. Módulo de Pacientes
**Objetivo:** Gestionar los datos personales y médicos de los pacientes.

**Flujo:**
1. Registro del paciente (por recepcionista o en línea).
2. Creación automática de su historia clínica.
3. Registro de antecedentes médicos.

**Tablas:**
- **Paciente:** idPaciente, dni, nombres, apellidos, fechaNacimiento, sexo, dirección, teléfono, correo, estado  
- **HistoriaClinica:** idHistoria, idPaciente (FK), fechaApertura, observaciones  
- **AntecedenteMedico:** idAntecedente, idHistoria (FK), tipo, descripción  

---

### 🩺 2. Módulo de Citas Médicas
**Objetivo:** Permitir la programación, reprogramación y cancelación de citas médicas.

**Flujo:**
1. El paciente agenda una cita con un médico.  
2. Puede modificarse o cancelarse antes de la atención.  
3. Al atenderse, la cita cambia a estado *“atendida”*.

**Tabla:**
- **Cita:** idCita, idPaciente (FK), idMedico (FK), fecha, hora, motivo, estado

---

### 🧑‍⚕️ 3. Módulo de Médicos y Especialidades
**Objetivo:** Registrar y administrar el personal médico y sus especialidades.

**Flujo:**
1. Registro del médico y sus datos de colegiatura.  
2. Registro de especialidades médicas.  
3. Asociación médico ↔ especialidad (relación muchos a muchos).

**Tablas:**
- **Medico:** idMedico, nombres, apellidos, colegiatura, teléfono, correo, estado  
- **Especialidad:** idEspecialidad, nombre, descripción  
- **MedicoEspecialidad:** idMedicoEsp, idMedico (FK), idEspecialidad (FK)

---

### 🧾 4. Módulo de Consultas y Diagnósticos
**Objetivo:** Registrar la atención médica, diagnóstico y tratamiento del paciente.

**Flujo:**
1. Registro de la consulta (fecha, motivo, observaciones).  
2. Creación de uno o varios diagnósticos.  
3. Emisión de receta médica y sus detalles.

**Tablas:**
- **Consulta:** idConsulta, idCita (FK), idMedico (FK), idPaciente (FK), fecha, hora, motivoConsulta, observaciones  
- **Diagnostico:** idDiagnostico, idConsulta (FK), descripción, tipo  
- **RecetaMedica:** idReceta, idConsulta (FK), indicaciones  
- **DetalleReceta:** idDetalleReceta, idReceta (FK), medicamento, dosis, frecuencia, duración

---

### 💳 5. Módulo de Facturación
**Objetivo:** Gestionar los cobros por servicios médicos y control de pagos.

**Flujo:**
1. Generación de factura al finalizar el servicio.  
2. Detalle de los servicios cobrados (consulta, medicamentos, laboratorio, etc.).  
3. Actualización del estado de pago.

**Tablas:**
- **Factura:** idFactura, idPaciente (FK), fechaEmision, total, estado  
- **DetalleFactura:** idDetalleFactura, idFactura (FK), concepto, monto

---

## 🗄️ Configuración de la Base de Datos (PostgreSQL)

El sistema utiliza **PostgreSQL**, y la conexión se encuentra configurada en el archivo:
📄 `src/main/resources/application.properties`

```properties
# Configuración del servidor
server.port=9090

# Configuración de PostgreSQL
spring.datasource.url=jdbc:postgresql://localhost:5432/hospital_db
spring.datasource.username=postgres
spring.datasource.password=tecsup
spring.datasource.driver-class-name=org.postgresql.Driver

# Configuración JPA / Hibernate
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect

# Logging
logging.level.org.springframework.web=DEBUG
logging.level.com.hospital=DEBUG

spring.application.name=Hospital Management System
```

📌 **Requisitos previos para ejecutar:**
1. Tener instalado **PostgreSQL**.
2. Crear la base de datos con el nombre:
   ```sql
   CREATE DATABASE hospital_db;
   ```
3. Usar el mismo usuario y contraseña que están en el archivo de configuración:
   - **Usuario:** `postgres`
   - **Contraseña:** `tecsup`

> El sistema se encargará de crear las tablas automáticamente gracias a la propiedad `spring.jpa.hibernate.ddl-auto=update`.

---

## 🚀 Cómo ejecutar el proyecto

1. Abre el proyecto en **IntelliJ IDEA**, **VS Code** o tu IDE preferido.  
2. Asegúrate de tener PostgreSQL corriendo.  
3. En la terminal del proyecto, ejecuta:
   ```bash
   mvn spring-boot:run
   ```
4. Abre tu navegador en:
   ```
   http://localhost:9090
   ```

---

## 👩‍💻 Desarrollado por
**Yamile Ochoa**  
Estudiante de Diseño y Desarrollo de Software – Tecsup  
📍 Proyecto: *Hospital Management System – Backend (Spring Boot + PostgreSQL)*  
