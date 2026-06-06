# 🚀 Despliegue y Pruebas de PWA

## Pruebas Locales Rápidas

### 1. Usar VS Code Live Server (MÁS FÁCIL)

```bash
# 1. Abre la carpeta del proyecto en VS Code
# 2. Haz clic derecho en index.html
# 3. "Open with Live Server"
# 4. Se abre en http://localhost:5500

# En DevTools (F12):
# - Ve a "Application" → "Service Workers"
# - Deberías ver el Service Worker registrado
```

### 2. Usar Python

```bash
# Python 3.x (recomendado)
cd tu/carpeta/proyecto
python -m http.server 8000

# Abre: http://localhost:8000
```

### 3. Usar Node.js (serve)

```bash
# Instalar (primera vez)
npm install -g serve

# Ejecutar
cd tu/carpeta/proyecto
serve -s .

# Abre: http://localhost:3000
```

---

## Despliegue en Producción

### A. GitHub Pages (GRATIS, HTTPS incluido)

#### Pasos:
1. **Crea un repositorio en GitHub**
```bash
git init
git add .
git commit -m "PWA inicial"
git remote add origin https://github.com/usuario/repositorio.git
git push -u origin main
```

2. **Habilita GitHub Pages**
   - Ve a Settings → Pages
   - Source: Deploy from a branch
   - Branch: main → Save
   - Espera 1-2 minutos
   - Tu PWA estará en: https://usuario.github.io/repositorio

3. **Ventajas:**
   - ✅ HTTPS automático
   - ✅ Gratis
   - ✅ Service Worker funciona
   - ✅ PWA completamente instalable

---

### B. Vercel (RECOMENDADO para PWA)

#### Pasos:
1. Ve a https://vercel.com
2. Sign up / Login
3. "New Project"
4. Selecciona tu repositorio de GitHub
5. Deploy
6. Tu PWA en: https://tu-proyecto.vercel.app

#### Ventajas:
- ✅ HTTPS
- ✅ Super rápido
- ✅ PWA completamente funcional
- ✅ Gratis

---

### C. Netlify (GRATIS y MÁS SIMPLE)

#### Pasos:
1. Ve a https://netlify.com
2. Conecta tu repositorio GitHub
3. "New site from Git"
4. Selecciona branch main
5. Deploy
6. Tu PWA en: https://tu-sitio.netlify.app

#### Configuración (ya está hecha):
```
Build command: (dejar vacío, es un proyecto estático)
Publish directory: . (raíz del proyecto)
```

---

### D. Tu propio servidor (Apache, Nginx, etc.)

#### Requisitos:
- ✅ Certificado SSL/HTTPS
- ✅ Servidor web configurado

#### Configuración Apache:
```apache
# .htaccess en la raíz del proyecto
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^ index.html [QSA,L]
</IfModule>

# Habilitar CORS para fonts
<IfModule mod_headers.c>
  Header set Access-Control-Allow-Origin "*"
</IfModule>
```

#### Configuración Nginx:
```nginx
server {
    listen 443 ssl http2;
    server_name tu-dominio.com;
    
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
    
    root /var/www/tu-proyecto;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Cache para PWA
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

---

## 📱 Pruebas en Dispositivo Real

### Android (Chrome, Firefox)

#### Pasos:
1. Conecta tu Android al WiFi de la misma red que tu PC
2. En Android, abre: `http://tu-ip-pc:puerto`
3. Espera a que cargue completamente
4. Presiona ⋮ (menú) → **"Instalar aplicación"** o **"Instalar app"**
5. Se instalará como app nativa
6. Abrirá en fullscreen

#### Alternativa: Usar ngrok (exponer localhost a internet)
```bash
# Instala ngrok: https://ngrok.com
ngrok http 8000

# Obtendrás una URL: https://xxxxx.ngrok.io
# Abre esa URL en Android
# ¡Ya funciona sin estar en la misma red!
```

### iPhone (Safari)

#### Pasos:
1. Abre en Safari
2. Presiona el ícono de compartir (↑)
3. "Agregar a pantalla de inicio"
4. Elige un nombre
5. Se agregará como ícono en el home
6. Abrirá en fullscreen (con limitaciones de iOS)

---

## ✅ Checklist de Prueba

Después de desplegar, verifica:

### En Navegador:
- [ ] Page carga completamente
- [ ] Todos los recursos (CSS, JS, imágenes) cargan correctamente
- [ ] Manifest.json es accesible (prueba en DevTools → Application)
- [ ] Service Worker se registra sin errores (DevTools → Application → Service Workers)
- [ ] Abre DevTools → Application → Manifest y ves todos los iconos

### Offline:
- [ ] Abre DevTools → Network
- [ ] Throttle a "Offline"
- [ ] Recarga la página: debe cargar desde caché
- [ ] Navega entre elementos: deben funcionar offline
- [ ] Vuelve online

### En Android:
- [ ] La app se instala sin errores
- [ ] Se abre en fullscreen (sin barra de navegación)
- [ ] Los iconos se muestran correctamente
- [ ] Funciona con datos móviles
- [ ] Funciona sin conexión (ya cacheado)
- [ ] La música sigue sonando en background
- [ ] Puedes instalar múltiples instancias

### En iPhone:
- [ ] Se puede agregar a pantalla de inicio
- [ ] Abre fullscreen
- [ ] El icono se muestra correctamente
- [ ] Funciona sin conexión (limitado a lo en caché)

---

## 🔍 Debugging Avanzado

### Ver logs del Service Worker:

#### En DevTools:
```
F12 → Application → Service Workers → Click en "Show/Hide console"
```

### Ver caché almacenado:

```javascript
// En la consola:
PWADebug.listCachedFiles()
```

### Limpiar caché manualmente:

```javascript
// En la consola:
PWADebug.clearCache()
```

### Forzar actualización:

```javascript
// En la consola:
PWADebug.updateServiceWorker()
```

---

## 📊 Monitoreo en Producción

### Lighthouse PWA Audit

En Chrome DevTools:
1. F12 → Lighthouse
2. "PWA" category
3. Analizar
4. Obtén score de PWA

Objetivo: **Score 90+**

---

## Problemas Comunes

### ❌ "Service Worker no se registra"
**Solución:**
- Verifica que sea HTTPS (en producción)
- Checkea la consola de errores (F12 → Console)
- Asegúrate que service-worker.js existe

### ❌ "Manifest no aparece"
**Solución:**
- Verifica el path en `<link rel="manifest">`
- Abre directamente el manifest: `https://tu-sitio.com/manifest.json`
- Revisa los errores en DevTools

### ❌ "No se instala en Android"
**Solución:**
- Debe ser HTTPS
- Manifest debe ser válido
- Service Worker debe registrarse
- Iconos deben existir

### ❌ "Caché no funciona offline"
**Solución:**
- Abre la página 1-2 veces para cachear recursos
- Verifica DevTools → Application → Cache Storage
- Limpia el caché y vuelve a cargar: `PWADebug.clearCache()`

---

## 🎉 ¡Listo!

Tu PWA está lista para:
- ✅ Instalar en Android
- ✅ Abrirse fullscreen
- ✅ Funcionar offline
- ✅ Cachear automáticamente
- ✅ Ser descubierta fácilmente

**Próximo paso:** Genera los iconos PNG y ¡a probar en un dispositivo real!
