/**
 * PWA Debug & Utilities
 * Herramientas para verificar y depurar la instalación de la PWA
 */

// ===== VERIFICACIÓN DE PWA =====
window.PWADebug = {
  
  /**
   * Verifica el estado de la PWA
   */
  checkPWAStatus: function() {
    console.log('=== 📱 PWA STATUS CHECK ===');
    
    // 1. Verificar Service Worker
    if ('serviceWorker' in navigator) {
      console.log('✅ Service Worker soportado');
      navigator.serviceWorker.getRegistrations().then(registrations => {
        if (registrations.length > 0) {
          console.log(`✅ ${registrations.length} Service Worker(s) registrado(s)`);
          registrations.forEach((reg, i) => {
            console.log(`   [${i}] Scope: ${reg.scope}`);
            console.log(`   [${i}] Estado: ${reg.active ? 'ACTIVO' : 'INACTIVO'}`);
          });
        } else {
          console.warn('⚠️ Ningún Service Worker registrado');
        }
      });
    } else {
      console.error('❌ Service Worker NO soportado en este navegador');
    }
    
    // 2. Verificar Manifest
    const manifest = document.querySelector('link[rel="manifest"]');
    if (manifest) {
      console.log('✅ Manifest.json enlazado:', manifest.href);
      fetch(manifest.href)
        .then(r => r.json())
        .then(data => {
          console.log('✅ Manifest cargado correctamente');
          console.log('   - Nombre:', data.name);
          console.log('   - Display:', data.display);
          console.log('   - Start URL:', data.start_url);
          console.log('   - Iconos:', data.icons?.length || 0);
        })
        .catch(e => console.error('❌ Error cargando manifest:', e));
    } else {
      console.error('❌ Manifest.json NO encontrado');
    }
    
    // 3. Verificar meta tags PWA
    const requiredMetas = [
      'theme-color',
      'apple-mobile-web-app-capable',
      'apple-mobile-web-app-status-bar-style',
      'mobile-web-app-capable'
    ];
    
    console.log('\n📋 Meta Tags:');
    requiredMetas.forEach(metaName => {
      const meta = document.querySelector(`meta[name="${metaName}"]`);
      if (meta) {
        console.log(`   ✅ ${metaName}`);
      } else {
        console.warn(`   ⚠️ ${metaName} - FALTA`);
      }
    });
    
    // 4. Verificar modo standalone
    if (window.navigator.standalone === true) {
      console.log('\n🚀 MODO STANDALONE ACTIVO (App instalada)');
    } else if (window.matchMedia('(display-mode: standalone)').matches) {
      console.log('\n🚀 MODO STANDALONE ACTIVO (mediante media query)');
    } else {
      console.log('\n🌐 Ejecutándose en navegador (no instalada)');
    }
    
    // 5. Verificar caché
    if ('caches' in window) {
      console.log('\n💾 Cache Storage:');
      caches.keys().then(cacheNames => {
        if (cacheNames.length === 0) {
          console.log('   ⚠️ Sin cachés aún');
        } else {
          cacheNames.forEach(name => {
            caches.open(name).then(cache => {
              cache.keys().then(requests => {
                console.log(`   📦 ${name}: ${requests.length} archivos`);
              });
            });
          });
        }
      });
    }
    
    console.log('\n===========================\n');
  },

  /**
   * Limpiar todo el caché
   */
  clearCache: function() {
    if ('caches' in window) {
      caches.keys().then(cacheNames => {
        Promise.all(cacheNames.map(cacheName => {
          console.log(`🗑️  Eliminando caché: ${cacheName}`);
          return caches.delete(cacheName);
        })).then(() => {
          console.log('✅ Caché completamente limpio');
          window.location.reload();
        });
      });
    }
  },

  /**
   * Simular modo offline
   */
  goOffline: function() {
    console.log('🔌 SIMULANDO MODO OFFLINE');
    navigator.onLine = false;
    console.log('   Si abres nuevas páginas, deberían cargarse desde caché');
    console.log('   (Nota: Esto es solo una simulación)');
  },

  /**
   * Volver online
   */
  goOnline: function() {
    console.log('📡 VOLVIENDO ONLINE');
    navigator.onLine = true;
  },

  /**
   * Forzar actualización del Service Worker
   */
  updateServiceWorker: function() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then(registrations => {
        registrations.forEach(registration => {
          registration.update();
          console.log('🔄 Buscando actualización de Service Worker...');
        });
      });
    }
  },

  /**
   * Desregistrar todos los Service Workers
   */
  unregisterServiceWorkers: function() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then(registrations => {
        registrations.forEach(registration => {
          registration.unregister();
          console.log('❌ Service Worker desregistrado');
        });
      });
    }
  },

  /**
   * Ver lista de archivos en caché
   */
  listCachedFiles: function() {
    console.log('📦 ARCHIVOS EN CACHÉ:\n');
    if ('caches' in window) {
      caches.keys().then(cacheNames => {
        cacheNames.forEach(cacheName => {
          caches.open(cacheName).then(cache => {
            cache.keys().then(requests => {
              console.log(`\n📂 ${cacheName}:`);
              requests.forEach(request => {
                console.log(`   • ${request.url}`);
              });
            });
          });
        });
      });
    }
  },

  /**
   * Información del dispositivo y navegador
   */
  deviceInfo: function() {
    console.log('📱 INFORMACIÓN DEL DISPOSITIVO:\n');
    const ua = navigator.userAgent;
    console.log('User Agent:', ua);
    console.log('Platform:', navigator.platform);
    console.log('Language:', navigator.language);
    console.log('Online:', navigator.onLine);
    console.log('Memory:', navigator.deviceMemory || 'N/A');
    console.log('CPU cores:', navigator.hardwareConcurrency || 'N/A');
    console.log('Connection:', navigator.connection?.effectiveType || 'N/A');
  },

  /**
   * Simular instalación de PWA (para Android)
   */
  simulateInstallPrompt: function() {
    console.log('📥 Simulando instalación de PWA...');
    console.log('En un dispositivo real, se mostraría el diálogo de instalación');
    console.log('En desktop, deberías ver un prompt en el navegador');
  }
};

// ===== COMANDOS DISPONIBLES =====
console.log(`
╔════════════════════════════════════════════════════════════════╗
║           🚀 PWA DEBUG COMMANDS - ESCRIBE EN CONSOLA           ║
╠════════════════════════════════════════════════════════════════╣
║                                                                ║
║  PWADebug.checkPWAStatus()          → Ver estado de PWA       ║
║  PWADebug.listCachedFiles()         → Ver archivos en caché   ║
║  PWADebug.clearCache()              → Limpiar caché           ║
║  PWADebug.updateServiceWorker()     → Actualizar SW          ║
║  PWADebug.unregisterServiceWorkers()→ Desregistrar SWs       ║
║  PWADebug.deviceInfo()              → Info del dispositivo    ║
║  PWADebug.goOffline()               → Simular offline         ║
║  PWADebug.goOnline()                → Volver online           ║
║                                                                ║
╚════════════════════════════════════════════════════════════════╝
`);

// Auto-ejecutar verificación al cargar
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
  window.addEventListener('load', () => {
    console.log('%c✅ PWA Debug cargado. Usa PWADebug.checkPWAStatus() para verificar', 'color: #ffb3c6; font-weight: bold; font-size: 14px;');
  });
}
