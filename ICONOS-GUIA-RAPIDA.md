# 🎨 Guía Rápida: Generar Iconos PNG para PWA

Tu proyecto PWA está casi completamente configurado. Solo necesitas **generar 6 iconos PNG** en diferentes tamaños.

## Opción 1: PWABuilder (RECOMENDADO - MÁS FÁCIL) ⭐

### Pasos:
1. Ve a https://www.pwabuilder.com
2. Ingresa la URL de tu sitio (o descarga tu proyecto localmente y usa http://localhost:8000)
3. PWABuilder detectará tu manifest.json automáticamente
4. Haz clic en **"Image Generator"**
5. Sube el archivo **icon.svg** desde `/img/icon.svg`
6. Elige los tamaños:
   - ✅ 192x192
   - ✅ 512x512
   - ✅ Maskable versions
7. Descarga el ZIP
8. Extrae los archivos en `/img/`

---

## Opción 2: Convertio.co (Online, Simple)

### Pasos:
1. Ve a https://convertio.co/svg-png/
2. Arrastra **icon.svg** a la ventana
3. Configura:
   - Width: 192
   - Height: 192
4. Convierte y descarga
5. Repite para 512x512
6. Guarda en `/img/`

---

## Opción 3: CloudConvert (Online, Más opciones)

### Pasos:
1. Ve a https://cloudconvert.com/svg-to-png
2. Carga **icon.svg**
3. En "Advanced Options", configura tamaño
4. Convierte
5. Descarga
6. Repite para cada tamaño

---

## Opción 4: GIMP (Gratis, Software)

### Pasos:
1. Descarga GIMP: https://www.gimp.org/
2. Abre **icon.svg** en GIMP
3. Image → Scale Image → 192x192
4. File → Export As → icon-192x192.png
5. Repite para cada tamaño:
   - 192x192
   - 512x512
   - Versiones maskable (con 40px de padding)

---

## Opción 5: Photoshop (Si lo tienes)

1. Abre icon.svg
2. Image → Image Size → 192x192 pixels
3. File → Export As → PNG
4. Repite para cada tamaño

---

## Opción 6: Figma (Online, Gratis)

### Pasos:
1. Ve a https://figma.com
2. Crea una nueva file
3. File → Import → **icon.svg**
4. Escala a 192x192
5. Right-click → Export → PNG
6. Descarga
7. Repite para cada tamaño

---

## 📋 Archivos necesarios:

Después de generar los iconos, copia estos archivos a `/img/`:

```
/img/
├── icon.svg                      (ya existe)
├── icon-192x192.png              ✅ NECESARIO
├── icon-512x512.png              ✅ NECESARIO
├── icon-maskable-192x192.png     ✅ NECESARIO
├── icon-maskable-512x512.png     ✅ NECESARIO
├── screenshot-wide.png           (opcional)
└── screenshot-wide-large.png     (opcional)
```

### ¿Qué son los iconos "maskable"?
- Son iconos con **área segura** alrededor del diseño
- Necesarios para Android Adaptive Icons (los iconos se adaptan al tema)
- Mantén el logo en el centro y dejaSpacio en blanco alrededor

---

## Verificar después de generar los iconos:

1. Abre DevTools (F12)
2. Ve a **Application** → **Manifest**
3. Deberías ver todos los iconos listados y funcionales
4. Haz clic en cada icono para verificar que existe

---

## 🚀 Rápido: Usar PWABuilder

```
1. https://www.pwabuilder.com
2. Ingresa tu URL
3. Image Generator
4. Sube icon.svg
5. Descarga los PNG
6. Coloca en /img/
7. ¡Listo!
```

**Esto es lo más rápido (~2 minutos)**

---

## Próximas pruebas:

Una vez tengas los iconos:

1. **En desktop**: DevTools → Application → Manifest → Ve los iconos
2. **En Android**:
   - Accede a tu web en Chrome
   - Presiona ⋮ (menú) → Instalar aplicación
   - Aparecerá tu icono personalizado
   - La app se instalará con tu diseño

3. **Instala y abre**:
   - La app abrirá en fullscreen
   - Sin barra de navegación
   - Como una app nativa
   - Funciona offline

---

## ¡Problemas?

Si los iconos no aparecen:
1. Verifica que están en `/img/` exactamente
2. Los nombres deben coincidir exactamente con manifest.json
3. Abre DevTools y busca errores (F12 → Console)
4. En DevTools → Network, verifica que los PNG cargan correctamente (status 200)

---

**⏱️ Tiempo estimado: 2-5 minutos con PWABuilder**

Una vez hayas copiado los iconos, tu PWA estará 100% completa y lista para instalar. 🎉
