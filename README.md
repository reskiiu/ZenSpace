# 🌿 ZenSpace

Plataforma de e-commerce de muebles estilo **Japandi** con panel de administración completo.

## Estructura del Proyecto

```
ZenSpace/
├── cliente/                  # Módulo de Usuario (Frontend)
│   ├── index.html            # Página Principal
│   ├── login.html            # Inicio de Sesión
│   ├── registro.html         # Registro de Cuenta
│   ├── perfil.html           # Perfil y Puntos Zen
│   ├── categorias.html       # Categorías de Productos
│   ├── catalogo.html         # Catálogo con filtros
│   ├── visualizador-3d.html  # Visualizador 3D interactivo
│   ├── seguimiento.html      # Seguimiento de Pedidos
│   ├── carrito.html          # Carrito de Compras
│   └── assets/
│       ├── css/main.css      # Estilos compartidos
│       └── js/               # Scripts compartidos
│
├── admin/                    # Panel de Administrador
│   ├── dashboard.html        # Dashboard con KPIs y gráficas
│   ├── gestion-pedidos.html  # Gestión de Pedidos
│   ├── gestion-categorias.html
│   ├── gestion-catalogo.html
│   ├── fidelidad.html        # Sistema de Puntos Zen
│   ├── inventario.html       # Precios y Stock
│   ├── logistica.html        # Logística y Transportadoras
│   └── assets/
│       ├── css/admin.css
│       └── js/admin.js
│
├── backend/                  # API REST (Node.js / Express)
│   ├── server.js
│   ├── config/.env.example
│   ├── routes/               # Endpoints de la API
│   ├── controllers/          # Lógica de negocio
│   ├── models/               # Modelos de BD
│   └── services/             # Integraciones externas
│
└── package.json
```

## Inicio Rápido (Frontend estático)

Simplemente abre `cliente/index.html` en tu navegador — no se requiere servidor para explorar el frontend.

## Inicio con Backend (Node.js)

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar variables de entorno
cp backend/config/.env.example backend/config/.env
# Edita .env con tus valores

# 3. Iniciar servidor de desarrollo
npm run dev

# 4. Abrir en el navegador
# http://localhost:3000
```

## Tecnologías

| Capa | Tecnología |
|------|-----------|
| Frontend | HTML5, CSS3, Bootstrap 5.3, Bootstrap Icons |
| Tipografía | Cormorant Garamond + DM Sans (Google Fonts) |
| Gráficas | Chart.js 4 |
| Backend | Node.js, Express |
| Base de datos | MongoDB (Mongoose) |
| Autenticación | JWT |

## Páginas del Cliente

| # | Archivo | Descripción |
|---|---------|-------------|
| 1 | `login.html` | Inicio de Sesión |
| 2 | `registro.html` | Registro de Cuenta |
| 3 | `perfil.html` | Perfil + Puntos Zen |
| 4 | `index.html` | Página Principal |
| 5 | `categorias.html` | Categorías |
| 6 | `catalogo.html` | Catálogo con filtros sidebar |
| 7 | `visualizador-3d.html` | Visualizador drag & drop |
| 8 | `seguimiento.html` | Rastreo de pedidos |
| 9 | `carrito.html` | Carrito de compras |

## Páginas del Admin

| # | Archivo | Descripción |
|---|---------|-------------|
| 10 | `dashboard.html` | Dashboard con KPIs + Chart.js |
| 11 | `gestion-pedidos.html` | Listado y edición de pedidos |
| 12 | `gestion-categorias.html` | CRUD de categorías |
| 13 | `gestion-catalogo.html` | CRUD de productos |
| 14 | `fidelidad.html` | Programa de Puntos Zen |
| 15 | `inventario.html` | Control de precios y stock |
| 16 | `logistica.html` | Gestión de envíos y transportadoras |

---

*Diseño inspirado en la filosofía Wabi-Sabi y el estilo Japandi.*
