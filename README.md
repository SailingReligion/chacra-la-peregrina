# 🌿 Chacra La Peregrina

Sitio web oficial de **Chacra La Peregrina** - Un espacio único para eventos, celebraciones y retiros en Uruguay.

## 📋 Descripción

Aplicación web desarrollada con Next.js que presenta Chacra La Peregrina, destacando sus instalaciones, servicios y permitiendo a los visitantes hacer consultas sobre eventos.

## ✨ Características

- 🌐 **Multiidioma**: Soporte para Español, Inglés y Portugués
- 📱 **Responsive**: Diseño adaptable a todos los dispositivos
- 🎨 **Animaciones**: Interfaz moderna con Framer Motion
- 📧 **Formulario de contacto**: Con email a la empresa + confirmación automática al cliente
- 🛡️ **Anti-spam**: Honeypot + rate-limit por IP + validación server-side (zod)
- 📊 **Registro de leads**: Cada consulta queda guardada en una Google Sheet (opcional)
- 🗺️ **Ubicación interactiva**: Mapa de Google Maps integrado
- 🖼️ **Galería visual**: Presentación atractiva de las instalaciones
- 🌓 **Modo oscuro/claro**: Temas personalizables

## 🛠️ Tecnologías

- **Framework**: Next.js 14
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Animaciones**: Framer Motion
- **UI Components**: Radix UI
- **Iconos**: Lucide React
- **Formulario**: Envío directo por email (sin base de datos)

## 🚀 Instalación

### Prerequisitos

- Node.js 18+ 
- npm o yarn

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

3. **Configurar variables de entorno (OPCIONAL)**
   
   El sitio funciona sin configuración adicional. Solo necesitás configurar variables si querés que el formulario envíe emails automáticamente:
   
   ```bash
   cp .env.example .env.local
   ```
   
   Editar `.env.local` y agregar las claves de API para envío de emails (ver `.env.example` para detalles)

4. **Ejecutar en desarrollo**
   ```bash
   npm run dev
   # o
   yarn dev
   ```

   Abrir [http://localhost:3000](http://localhost:3000) en el navegador.

> **Nota**: El formulario de contacto está configurado para enviar emails a `ebarlocco@gmail.com`. Si no configurás las variables de entorno para emails, el formulario seguirá funcionando pero no enviará notificaciones.

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

## 📨 Cómo funciona el formulario de contacto

Cuando alguien envía el formulario, el sistema:

1. **Valida** los datos en el servidor (formato de email, longitudes, campos requeridos).
2. **Frena spam** con tres capas: un campo honeypot invisible, un límite de 5 envíos cada 10 minutos por IP, y la validación de arriba.
3. **Envía 2 emails**:
   - Uno a la empresa (`CONTACT_TO_EMAIL`) con todos los datos de la consulta.
   - Otro al cliente confirmando "Recibimos tu solicitud" (en su idioma).
4. **Guarda el lead** en una Google Sheet (si está configurada), para no perder nunca un contacto.

### Configurar el envío de emails (Resend)

1. Creá una cuenta gratis en [resend.com](https://resend.com) (100 emails/día gratis).
2. Para probar rápido podés usar el remitente `onboarding@resend.dev`. Para producción, verificá tu dominio y usá algo como `eventos@chacralaperegrina.com`.
3. Generá una **API Key** y cargala en `RESEND_API_KEY`.
4. Configurá `RESEND_FROM_EMAIL` y `CONTACT_TO_EMAIL` (ver `.env.example`).

> Si no configurás Resend, en el entorno de preview de Abacus se usa el servicio interno como respaldo. Para producción real (Vercel/Squarespace), **usá Resend**.

## 📊 Guardar consultas en Google Sheet

Método simple y sin credenciales complejas, usando un Google Apps Script:

1. Creá una **Google Sheet** nueva.
2. Andá a **Extensiones → Apps Script**.
3. Pegá este código y guardá:

   ```javascript
   function doPost(e) {
     var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
     var data = JSON.parse(e.postData.contents);
     // Si la hoja está vacía, escribe los encabezados
     if (sheet.getLastRow() === 0) {
       sheet.appendRow(['Fecha', 'Nombre', 'Email', 'Teléfono', 'Tipo Evento', 'Fecha Evento', 'Invitados', 'Mensaje', 'Idioma']);
     }
     sheet.appendRow([
       data.timestamp, data.name, data.email, data.phone,
       data.eventType, data.eventDate, data.guestCount, data.message, data.language
     ]);
     return ContentService.createTextOutput(JSON.stringify({ result: 'ok' }))
       .setMimeType(ContentService.MimeType.JSON);
   }
   ```

4. Click en **Implementar → Nueva implementación → Aplicación web**.
   - "Ejecutar como": tu cuenta.
   - "Quién tiene acceso": **Cualquiera**.
5. Copiá la **URL de la app web** y pegala en `GOOGLE_SHEET_WEBHOOK_URL`.

¡Listo! Cada consulta aparecerá como una fila nueva en tu planilla, que podés ver desde el celular.

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
