# 🏥 Hospital Management System - Frontend (React)

## 📋 Descripción general
Este proyecto corresponde al **Frontend** del Sistema de Gestión Hospitalaria.  
Su propósito es proporcionar una **interfaz moderna, intuitiva y eficiente** que permita la interacción del usuario con los módulos principales del sistema, como la gestión de pacientes, médicos, citas, consultas y facturación.

Desarrollado con **React + TypeScript**, **Bootstrap 5** y **React Router**, este frontend consume los servicios REST del backend desarrollado en **Spring Boot**.

---

## ⚙️ Tecnologías utilizadas
- ⚛️ **React 18**
- 💅 **Bootstrap 5**
- 🧭 **React Router DOM**
- 🧩 **TypeScript**
- 🔄 **Axios** para llamadas HTTP (si se implementan peticiones)
- 🎨 **Lucide React** / **React Icons** para iconografía

---

## 🚀 Instalación y ejecución local

### 1️⃣ Clonar el repositorio
```bash
git clone https://github.com/YamileOchoa/Hospital-System.git
```

### 2️⃣ Ingresar a la carpeta del frontend
```bash
cd Frontend-react
```

### 3️⃣ Instalar dependencias
```bash
npm install
```

### 4️⃣ Ejecutar el servidor de desarrollo
```bash
npm run dev
```

El proyecto estará disponible en  
👉 [http://localhost:5173](http://localhost:5173)

---

## 🔗 Conexión con el backend

El frontend está configurado para comunicarse con el backend de Spring Boot que corre en el puerto **9090**.

Por defecto, el backend utiliza PostgreSQL con la siguiente configuración (en `application.properties`):
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/hospital_db
spring.datasource.username=postgres
spring.datasource.password=tecsup
```

Asegúrate de que el backend esté ejecutándose antes de probar las funcionalidades completas.

---

## 🧱 Estructura de carpetas principal
```
Frontend-react/
│
├── src/
│   ├── components/       # Componentes reutilizables (Navbar, Footer, etc.)          
│   ├── services/         # Servicios de conexión con la API
│   ├── App.tsx           # Enrutamiento principal
│   └── main.tsx          # Punto de entrada
│
├── package.json          # Dependencias y scripts
└── vite.config.ts        # Configuración de Vite
```

---

## 🧑‍💻 Autora
**Yamile Ochoa**  
Estudiante de Diseño y Desarrollo de Software - Tecsup  
📅 Proyecto académico - 2025-II

