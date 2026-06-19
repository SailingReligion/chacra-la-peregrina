# 🌿 Chacra La Peregrina

Sitio web oficial de **Chacra La Peregrina** — Un espacio único para eventos, celebraciones y retiros en armonía con la naturaleza. Laguna del Sauce, Punta del Este, Uruguay.

---

## 📋 Descripción

Landing page moderna desarrollada con **Next.js 14**, publicada en **GitHub Pages**, que presenta Chacra La Peregrina, sus instalaciones, servicios y permite a los visitantes hacer consultas sobre eventos mediante un formulario que envía notificaciones por email.

---

## ✨ Características

- 🌐 **Multiidioma**: Soporte para Español, Inglés y Portugués
- 📱 **Responsive**: Diseño adaptable a todos los dispositivos
- 🎨 **Animaciones**: Interfaz moderna con Framer Motion
- 📧 **Formulario de contacto**: Envío directo de emails vía Web3Forms (servicio gratuito)
- 🛡️ **Anti-spam**: Honeypot (campo trampa) + filtros automáticos de Web3Forms
- 🗺️ **Ubicación interactiva**: Mapa de Google Maps integrado (sin API key)
- 🖼️ **Galería visual**: Presentación atractiva de las instalaciones
- 🌓 **Modo oscuro/claro**: Temas personalizables
- ⚡ **Sitio estático**: Publicado en GitHub Pages, ultra-rápido y gratis

---

## 🛠️ Tecnologías

- **Framework**: Next.js 14 (App Router, static export)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Animaciones**: Framer Motion
- **UI Components**: Radix UI
- **Iconos**: Lucide React
- **Formulario**: Web3Forms (servicio gratuito de envío de emails)
- **Hosting**: GitHub Pages

---

## 🚀 Instalación local (para desarrollo)

### Prerequisitos

- Node.js 18+ 
- npm o yarn

### Pasos

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/SailingReligion/chacra-la-peregrina.git
   cd chacra-la-peregrina/nextjs_space
   ```

2. **Instalar dependencias**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Ejecutar en desarrollo**
   ```bash
   npm run dev
   ```

   Abrir [http://localhost:3000](http://localhost:3000) en el navegador.

---

## 📨 Configurar el formulario de contacto (Web3Forms)

El formulario envía los datos de consultas directamente a tu casilla de email usando **Web3Forms**, un servicio gratuito que no requiere servidor propio.

### ⚠️ IMPORTANTE — Configurar tu ACCESS KEY antes de publicar

**Pasos (hacelo una sola vez):**

1. **Registrarte en Web3Forms** (gratis, sin tarjeta):
   - Andá a [web3forms.com](https://web3forms.com)
   - Ingresá con tu email

2. **Crear una Access Key nueva**:
   - Hacé click en "Create Access Key"
   - En **"Email to receive submissions"** poné: `ebarlocco@gmail.com`
   - Guardá y copiá la **Access Key** que te generan (un código largo tipo `abc123-def456-...`)

3. **Pegar la clave en el código**:
   - Abrí el archivo `components/sections/contact.tsx`
   - Buscá la línea que dice `'PEGAR_AQUI_TU_ACCESS_KEY'`
   - Reemplazá ese texto con tu clave:
     ```typescript
     const WEB3FORMS_ACCESS_KEY =
       process.env.NEXT_PUBLIC_WEB3FORMS_KEY || 'tu_clave_real_abc123';
     ```

4. **Guardar y subir a GitHub**:
   ```bash
   git add components/sections/contact.tsx
   git commit -m "Configurar Web3Forms access key"
   git push origin main
   ```

> **Nota de seguridad**: La access key de Web3Forms está diseñada para vivir en el código del sitio (lado del cliente), **no es secreta**. Igualmente, si preferís, podés definirla como variable de entorno `NEXT_PUBLIC_WEB3FORMS_KEY` en GitHub (Settings → Secrets and variables → Actions) y tiene prioridad sobre la que está en el código.

### 📬 Qué recibís en tu email

Cuando alguien envía el formulario, te llega un email con:
- Nombre
- Email de la persona
- Teléfono
- Tipo de evento
- Fecha tentativa
- Cantidad de invitados
- Mensaje
- Idioma en el que completó el formulario

### 🛡️ Anti-spam

El formulario incluye dos capas de protección:
1. **Honeypot** (campo trampa invisible): si un bot lo llena, la solicitud no se envía.
2. **Filtros de Web3Forms**: el servicio bloquea automáticamente spam y bots conocidos.

---

## 🌍 Publicar en GitHub Pages

El sitio se publica **automáticamente** en GitHub Pages cada vez que subís cambios a la rama `main`.

### ✅ Activar GitHub Pages (hacelo una sola vez)

1. Andá a tu repositorio en GitHub: [https://github.com/SailingReligion/chacra-la-peregrina](https://github.com/SailingReligion/chacra-la-peregrina)
2. Click en **Settings** (arriba a la derecha)
3. En el menú de la izquierda, click en **Pages**
4. En **"Source"**, elegí: **GitHub Actions**
5. Guardá

¡Listo! A partir de ahí, cada push a `main` dispara un build automático y actualiza el sitio.

### 🔗 URL del sitio en GitHub Pages

- **Sin dominio propio**: `https://sailingreligion.github.io/chacra-la-peregrina`
- **Con tu dominio de Squarespace**: (ver sección siguiente)

> Si el sitio se ve sin estilos en GitHub Pages, descomentá esta línea en `.github/workflows/deploy.yml`:
> ```yaml
> NEXT_PUBLIC_BASE_PATH: /chacra-la-peregrina
> ```
> Y hacé commit + push.

---

## 🌐 Conectar tu dominio de Squarespace

Querés que el sitio se vea en `www.chacralaperegrina.com` (o el dominio que tengas en Squarespace) en vez del link de GitHub? Acá te explico cómo.

### Paso 1: Configurar el dominio en GitHub

1. Andá a tu repo → **Settings** → **Pages**
2. En **"Custom domain"**, escribí tu dominio: `chacralaperegrina.com` (o con `www.`)
3. Click en **Save**
4. GitHub te va a mostrar los **registros DNS** que tenés que configurar en Squarespace

### Paso 2: Configurar DNS en Squarespace

1. Entrá a tu cuenta de Squarespace
2. Andá a **Settings → Domains → [tu dominio] → DNS Settings**
3. Agregá estos registros (GitHub te los muestra, pero típicamente son):

   **Para el dominio raíz (`chacralaperegrina.com`):**
   - Tipo: `A`
   - Host: `@`
   - Valores (agregá los 4):
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`

   **Para `www` (`www.chacralaperegrina.com`):**
   - Tipo: `CNAME`
   - Host: `www`
   - Valor: `sailingreligion.github.io`

4. **Guardá** y esperá 15-30 minutos (puede tardar hasta 48hs).

### Paso 3: Ajustar el workflow de GitHub Actions

Una vez que tenés el dominio conectado, el sitio debe compilarse SIN el `basePath`. Editá `.github/workflows/deploy.yml`:

```yaml
# Comentá o eliminá esta línea:
# NEXT_PUBLIC_BASE_PATH: /chacra-la-peregrina

# Actualizá la URL del sitio:
NEXT_PUBLIC_SITE_URL: https://chacralaperegrina.com
```

Commit y push:
```bash
git add .github/workflows/deploy.yml
git commit -m "Actualizar configuración para dominio propio"
git push origin main
```

¡Listo! En unos minutos el sitio estará en tu dominio. 🎉

---

## 📁 Estructura del proyecto

```
nextjs_space/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Deploy automático a GitHub Pages
├── app/
│   ├── globals.css            # Estilos globales
│   ├── layout.tsx             # Layout principal + metadata SEO
│   ├── page.tsx               # Página principal (importa LandingPage)
│   ├── robots.ts              # robots.txt
│   └── sitemap.ts             # sitemap.xml
├── components/
│   ├── landing-page.tsx       # Componente principal
│   └── sections/              # Secciones de la landing
│       ├── site-header.tsx    # Header + navegación + selector de idioma
│       ├── hero.tsx           # Hero con imagen de fondo
│       ├── values.tsx         # "Por qué La Peregrina"
│       ├── gallery.tsx        # Galería de fotos + lightbox
│       ├── venue.tsx          # El Lugar (tabs: quincho, piscina, naturaleza)
│       ├── events.tsx         # Tipos de eventos
│       ├── faq.tsx            # Preguntas frecuentes
│       ├── contact.tsx        # Formulario + mapa
│       └── site-footer.tsx    # Footer
├── lib/
│   ├── i18n.ts               # Configuración de idiomas
│   ├── translations.ts       # Traducciones es/en/pt
│   ├── locale-context.tsx    # Contexto React para idioma
│   └── utils.ts              # Utilidades (cn, etc.)
├── public/
│   └── images/               # Todas las imágenes del sitio
└── next.config.js            # Configuración Next.js (basePath, static export)
```

---

## 🌍 Idiomas soportados

- 🇪🇸 **Español** (predeterminado)
- 🇬🇧 **Inglés**
- 🇧🇷 **Portugués**

El idioma se guarda en `localStorage` del navegador y persiste entre visitas.

---

## 📦 Scripts disponibles

```bash
npm run dev      # Modo desarrollo (localhost:3000)
npm run build    # Compilar sitio estático (genera carpeta .next con export)
npm run start    # Iniciar servidor local del build estático
npm run lint     # Ejecutar linter
```

---

## 🔒 Privacidad del sitio (verlo solo entre ustedes antes de hacerlo público)

Si querés que el sitio esté subido pero **no sea encontrable** hasta que estén listos:

1. **NO conectes tu dominio** (dejá solo el link de GitHub Pages sin difundir).
2. El link `https://sailingreligion.github.io/chacra-la-peregrina` es técnicamente público, pero nadie lo va a encontrar si no lo compartís ni lo indexás en Google.
3. Cuando estén listos, conectá el dominio y compartilo.

> **Nota**: GitHub Pages con plan gratuito no permite protección con contraseña. Si necesitás contraseña real, considerá Netlify (gratis, con password protection).

---

## 🐛 Solución de problemas

### El formulario no envía emails
- ✅ Verificá que hayas pegado tu **Web3Forms Access Key** en `contact.tsx`.
- ✅ Revisá la consola del navegador (F12 → Console) por errores.
- ✅ Probá con un email real (no `test@test.com`).

### El sitio se ve sin estilos en GitHub Pages
- ✅ Descomentá `NEXT_PUBLIC_BASE_PATH: /chacra-la-peregrina` en `.github/workflows/deploy.yml`
- ✅ Commit + push
- ✅ Esperá 2-3 minutos a que GitHub reconstruya el sitio

### El dominio de Squarespace no apunta
- ✅ Verificá que los 4 registros `A` y el `CNAME` estén bien configurados en Squarespace.
- ✅ Esperá hasta 48hs para propagación DNS.
- ✅ Usá [whatsmydns.net](https://www.whatsmydns.net) para verificar si el DNS ya se actualizó.

---

## 📞 Contacto

Para más información sobre Chacra La Peregrina:
- **Email**: ebarlocco@gmail.com
- **Ubicación**: El Pejerrey, Laguna del Sauce, Punta del Este, Uruguay

---

## 👥 Autores

Desarrollado para Chacra La Peregrina por Abacus AI Agent

---

## 📄 Licencia

Este proyecto es privado y pertenece a Chacra La Peregrina.

---

✨ **Hecho con ❤️ en Uruguay** 🇺🇾
