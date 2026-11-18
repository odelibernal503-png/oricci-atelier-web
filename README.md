# 🧁 Oricci Atelier Dulce y Salado — Plataforma Web y API

Plataforma web de e-commerce y gestión de pedidos personalizados para repostería artesanal (cupcakes, galletas gourmet, mini pasteles y postres en vaso). Desarrollada con arquitectura cliente-servidor contenedorizada, proxy inverso y cifrado HTTPS.

---

## 👥 Integrantes del Equipo

| Nombre Completo | Carné | Rol en esta Fase |
| :--- | :--- | :--- |
| **Jekssy Odeli Bernal Montesinos** (Líder) | U20250299 | Arquitectura, Repositorio GitHub & Documentación |
| **Edgar Rigofredo Bermudez Magaña** | U20251147 | Backend Core (Express + TS), Docker & `/health` |
| **Leonardo Israel Quintanilla Vasquez** | U20241478 | API de Catálogo (`/api/productos`) |
| **Ricardo Abraham Pereyra Zelayandia** | U20230750 | API de Pedidos Personalizados (`/api/pedidos`) |
| **Meybeline Abigail Corvera Cruz** | U20261631 | Frontend Estático (HTML5 / CSS / Tailwind) |
| **Gustavo Nahum Marquez Cruz** | U20261632 | Integración Frontend-API (`fetch`) |
| **Edwin Moises Cruz Perla** | U20240211 | Servidor Web (Apache/IIS), ProxyPass & SSL/HTTPS |

---

## 🏗️ Arquitectura del Sistema

El sistema separa el contenido estático del procesamiento dinámico mediante un **Reverse Proxy** protegido por TLS/SSL:

```text
[ Navegador Cliente ]
         │
         ▼  (HTTPS - Puerto 443 | Certificado SSL Local)
[ Servidor Web: Apache / IIS ]
    ├── /          ──► Sirve archivos estáticos (HTML5 / CSS / JS)
    └── /api/*     ──► Reverse Proxy (ProxyPass)
                             │
                             ▼  (HTTP Interno - Puerto 3000)
                 [ Contenedor Docker: Node.js + Express + TS ]
                             │
                             ▼
                 [ Respuestas JSON: /api/productos, /api/pedidos, /health ]