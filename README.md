# 🌿 Chacra La Peregrina

Sitio web oficial de **Chacra La Peregrina** - Un espacio único para eventos, celebraciones y retiros en Uruguay.

## 📋 Descripción

Aplicación web desarrollada con Next.js que presenta Chacra La Peregrina, destacando sus instalaciones, servicios y permitiendo a los visitantes hacer consultas sobre eventos.

## ✨ Características

- 🌐 **Multiidioma**: Soporte para Español, Inglés y Portugués
- 📱 **Responsive**: Diseño adaptable a todos los dispositivos
- 🎨 **Animaciones**: Interfaz moderna con Framer Motion
- 📧 **Formulario de contacto**: Sistema integrado para consultas
- 🗺️ **Ubicación interactiva**: Mapa integrado de OpenStreetMap
- 🖼️ **Galería visual**: Presentación atractiva de las instalaciones
- 🌓 **Modo oscuro/claro**: Temas personalizables

## 🛠️ Tecnologías

- **Framework**: Next.js 14
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Animaciones**: Framer Motion
- **Base de datos**: PostgreSQL con Prisma ORM
- **UI Components**: Radix UI
- **Iconos**: Lucide React

## 🚀 Instalación

### Prerequisitos

- Node.js 18+ 
- npm o yarn
- PostgreSQL

### Pasos

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/SailingReligion/chacra-la-peregrina.git
   cd chacra-la-peregrina
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   # o
   yarn install
   ```

3. **Configurar variables de entorno**
   
   Crear archivo `.env` basado en `.env.example`:
   ```bash
   cp .env .env.local
   ```
   
   Configurar las variables necesarias en `.env.local`

4. **Configurar base de datos**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Ejecutar en desarrollo**
   ```bash
   npm run dev
   # o
   yarn dev
   ```

   Abrir [http://localhost:3000](http://localhost:3000) en el navegador.

## 📦 Scripts disponibles

```bash
npm run dev      # Modo desarrollo
npm run build    # Compilar para producción
npm run start    # Iniciar servidor de producción
npm run lint     # Ejecutar linter
```

## 📁 Estructura del proyecto

```
nextjs_space/
├── app/                    # Rutas y páginas (App Router)
│   ├── api/               # API routes
│   ├── globals.css        # Estilos globales
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Página principal
├── components/            # Componentes React
│   └── sections/         # Secciones de la landing page
├── lib/                   # Utilidades y configuración
│   ├── i18n.ts           # Configuración de idiomas
│   ├── translations.ts   # Traducciones
│   └── prisma.ts         # Cliente Prisma
├── prisma/               # Esquema de base de datos
├── public/               # Archivos estáticos
│   └── images/          # Imágenes del sitio
└── types/                # Tipos TypeScript
```

## 🌍 Idiomas soportados

- 🇪🇸 Español (predeterminado)
- 🇬🇧 Inglés
- 🇧🇷 Portugués

## 📞 Contacto

Para más información sobre Chacra La Peregrina:
- **Email**: ebarlocco@gmail.com
- **Ubicación**: Ruta Interbalnearia Km. 82, Uruguay

## 👥 Autores

Desarrollado para Chacra La Peregrina

## 📄 Licencia

Este proyecto es privado y pertenece a Chacra La Peregrina.

---

Hecho con ❤️ en Uruguay 🇺🇾
