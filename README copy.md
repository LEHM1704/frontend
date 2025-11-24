# 🍽️ Sistema de Gestión de Restaurante (POS)

Este proyecto es una solución completa Fullstack para la administración de un restaurante. Incluye gestión de inventario, categorías y un Punto de Venta (POS) transaccional con control de stock en tiempo real.

Construido siguiendo estándares de arquitectura profesional por capas y principios SOLID.

---

## 🚀 Tecnologías Utilizadas

### Backend (API RESTful)

- **Lenguaje:** PHP 7.1
- **Framework:** Slim Framework 2.6
- **Base de Datos:** MySQL (PDO con Transacciones ACID)
- **Librerías:**
  - `monolog/monolog`: Para auditoría y logs.
  - `vlucas/phpdotenv`: Gestión de variables de entorno.
- **Arquitectura:** MVC + Service Pattern + Repository Pattern.

### Frontend (SPA)

- **Framework:** Angular (Modular Architecture)
- **Estilos:** Tailwind CSS
- **Componentes UI:** PrimeNG (Tablas, Diálogos, Toasts)
- **Arquitectura:** Lazy Loading, Interceptors, Guards, Services (SRP).

---

## 🛠️ Guía de Instalación

Sigue estos pasos para desplegar el proyecto en tu entorno local.

### 1. Base de Datos

1.  Crear una base de datos en MySQL llamada `restaurante_backend`.
2.  Importar el script SQL (Tablas: `usuarios`, `categorias`, `productos`, `ventas`, `detalle_ventas`).
3.  Insertar el usuario administrador por defecto (ver sección Credenciales).

### 2. Configuración del Backend

1.  Acceder a la carpeta `backend`.
2.  Instalar dependencias de PHP:
    ```bash
    composer install
    ```
3.  Crear el archivo `.env` basado en el ejemplo:
    ```ini
    DB_HOST=localhost
    DB_NAME=restaurante_backend
    DB_USER=root
    DB_PASS=
    API_KEY=clave_secreta_restaurante_123
    ```
4.  Asegurarse de que la carpeta `logs/` tenga permisos de escritura.

### 3. Configuración del Frontend

1.  Acceder a la carpeta `frontend`.
2.  Instalar dependencias de Node:
    ```bash
    npm install
    ```
3.  Verificar la configuración en `src/environments/environment.ts`:
    ```typescript
    export const environment = {
      production: false,
      apiUrl: "http://localhost:8080/proyecto_final/backend/public",
      apiKey: "QldyQdarVjmFlSGH",
    };
    ```
4.  Iniciar el servidor de desarrollo:
    ```bash
    ng serve -o
    ```

---

## 📖 Manual de Uso

### Credenciales de Acceso

Para ingresar al sistema, utiliza el siguiente usuario administrador:

- **Email:** `admin@restaurant.pe`
- **Contraseña:** `123`

### Módulos del Sistema

#### 1. Autenticación (`/auth/login`)

Sistema de login seguro que valida credenciales contra hash (Bcrypt) y protege las rutas internas mediante `AuthGuard`.

#### 2. Gestión de Categorías (`/admin/categorias`)

- CRUD completo para clasificar el menú (ej. Entradas, Bebidas).
- Validación para evitar nombres duplicados o vacíos.

#### 3. Gestión de Productos (`/admin/productos`)

- Inventario con imagen, precio y stock.
- Visualización de estado de stock (Semáforo de colores).
- **Validación:** Impide crear productos con precio negativo o sin categoría.

#### 4. Punto de Venta - POS (`/admin/pos`)

- Interfaz visual para la toma de pedidos.
- **Carrito de Compras:** Cálculo automático de totales.
- **Control de Stock:** El sistema impide agregar más productos de los disponibles en almacén.
- **Procesamiento:** Al cobrar, se ejecuta una transacción en base de datos que registra la venta y descuenta el stock en una sola operación atómica.

---

## 📡 Endpoints Principales (API Reference)

Todas las peticiones requieren el Header: `API-KEY: clave_secreta_restaurante_123`

| Método | Endpoint      | Descripción                                      |
| :----- | :------------ | :----------------------------------------------- |
| `POST` | `/auth/login` | Iniciar sesión y obtener acceso.                 |
| `GET`  | `/productos`  | Listar productos con su categoría.               |
| `POST` | `/productos`  | Crear nuevo producto.                            |
| `GET`  | `/categorias` | Listar categorías activas.                       |
| `POST` | `/ventas`     | Registrar venta y descontar stock (Transacción). |

---

## 📂 Estructura del Proyecto

```text
/proyecto_final
├── backend/
│   ├── app/
│   │   ├── controllers/   # Manejo de HTTP (Request/Response)
│   │   ├── services/      # Lógica de Negocio y Validaciones
│   │   ├── repositories/  # Consultas SQL y Transacciones
│   │   └── ...
│   └── public/            # Punto de entrada (index.php)
│
└── frontend/
    ├── src/app/
    │   ├── core/          # Servicios Globales, Guards, Modelos
    │   ├── features/      # Módulos funcionales (Auth, Dashboard)
    │   └── shared/        # Componentes UI reutilizables (PrimeNG)
```
