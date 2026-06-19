# 📧 Activar los emails del formulario

Hola! Para que el formulario de la web envíe los emails a `ebarlocco@gmail.com`, tenés que pegar una clave en el código. Son 5 minutos.

---

## PASO 1: Conseguir la clave de Web3Forms

1. Entrá a tu cuenta de **Web3Forms**: https://web3forms.com
   - (Ya tenés una cuenta creada con tu email)

2. **Creá un Access Key nuevo**:
   - Click en el botón **"Create New Access Key"**
   - Nombre: `Chacra La Peregrina`
   - Email de destino: `ebarlocco@gmail.com`
   - Click en **"Create"**

3. **Copiá la clave** que aparece (es un texto largo tipo: `abc123-def456-ghi789...`)
   - Guardala en algún lado (notepad, email, donde sea)

---

## PASO 2: Pegar la clave en el código

### Opción A — Desde GitHub.com (más fácil, sin programas):

1. Andá a: https://github.com/SailingReligion/chacra-la-peregrina

2. Buscá el archivo: `components/sections/contact.tsx`
   - Click en la carpeta `components`
   - Click en la carpeta `sections`
   - Click en el archivo `contact.tsx`

3. Click en el **lápiz** (icono de editar, arriba a la derecha del archivo)

4. Buscá la línea que dice (es la línea ~31, cerca del principio):
   ```typescript
   const WEB3FORMS_ACCESS_KEY =
     process.env.NEXT_PUBLIC_WEB3FORMS_KEY || 'PEGAR_AQUI_TU_ACCESS_KEY';
   ```

5. **Reemplazá** `PEGAR_AQUI_TU_ACCESS_KEY` con tu clave (la que copiaste en el paso 1):
   ```typescript
   const WEB3FORMS_ACCESS_KEY =
     process.env.NEXT_PUBLIC_WEB3FORMS_KEY || 'tu_clave_abc123def456...';
   ```
   ⚠️ **IMPORTANTE**: Dejá las comillas simples `'...'` alrededor de tu clave.

6. Scrolleá abajo y click en **"Commit changes"** (botón verde)

7. En el popup que aparece, click de nuevo en **"Commit changes"**

---

### Opción B — Desde tu computadora (si sabés usar git):

1. Abrí el archivo: `components/sections/contact.tsx`

2. Buscá la línea ~31:
   ```typescript
   const WEB3FORMS_ACCESS_KEY =
     process.env.NEXT_PUBLIC_WEB3FORMS_KEY || 'PEGAR_AQUI_TU_ACCESS_KEY';
   ```

3. Reemplazá `PEGAR_AQUI_TU_ACCESS_KEY` con tu clave (dejá las comillas `'...'`)

4. Guardá el archivo

5. Hacé commit y push:
   ```bash
   git add components/sections/contact.tsx
   git commit -m "Configurar Web3Forms access key"
   git push origin main
   ```

---

## ✅ ¡Listo!

En 2-3 minutos, GitHub va a recompilar el sitio automáticamente con la clave nueva.

**Para probar:**
1. Andá a: https://sailingreligion.github.io/chacra-la-peregrina
2. Scrolleá hasta el formulario de contacto
3. Llenalo con datos de prueba
4. Click en "Enviar Consulta"
5. Revisá tu casilla `ebarlocco@gmail.com` — debería llegarte el email

---

## ❓ ¿Problemas?

- **No me llega el email**: Verificá que hayas pegado bien la clave (sin espacios extra, con las comillas)
- **No sé dónde pegar**: Pedile a Esteban que te ayude, es re fácil
- **Otro problema**: Mandame un mensaje y lo vemos

---

Cualquier cosa chifla 👍
