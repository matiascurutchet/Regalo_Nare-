// Service Worker para PWA - Modo Offline
const CACHE_NAME = 'universo-mati-nare-v1';
const RUNTIME_CACHE = 'universo-mati-nare-runtime-v1';
const URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/music/playlist.json'
];

// Evento: Instalación del Service Worker
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Instalando...');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Cacheando archivos estáticos');
      return cache.addAll(URLS_TO_CACHE);
    }).catch((error) => {
      console.error('[Service Worker] Error al cachear:', error);
    })
  );
  self.skipWaiting(); // Activar inmediatamente
});

// Evento: Activación del Service Worker
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activando...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // Eliminar cachés antiguas
          if (cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE) {
            console.log('[Service Worker] Eliminando caché antigua:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim(); // Controlar clientes existentes
});

// Evento: Fetch - Estrategia Network First con Fallback a Cache
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Ignorar peticiones no-GET
  if (request.method !== 'GET') {
    return;
  }

  // Estrategia diferente para recursos estáticos vs dinámicos
  if (isStaticAsset(url.pathname)) {
    // Cache First para imágenes, música, videos
    event.respondWith(cacheFirstStrategy(request));
  } else {
    // Network First para HTML, JSON, scripts
    event.respondWith(networkFirstStrategy(request));
  }
});

// Determinar si es un recurso estático
function isStaticAsset(pathname) {
  const staticExtensions = [
    '.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg',
    '.mp3', '.m4a', '.wav', '.ogg',
    '.mp4', '.webm', '.mov',
    '.woff', '.woff2', '.ttf', '.eot'
  ];
  
  return staticExtensions.some(ext => pathname.toLowerCase().endsWith(ext));
}

// Estrategia: Cache First (buscar en caché primero)
async function cacheFirstStrategy(request) {
  try {
    const cached = await caches.match(request);
    if (cached) {
      console.log('[Service Worker] Cache Hit:', request.url);
      return cached;
    }

    const response = await fetch(request);
    if (!response || response.status !== 200 || response.type === 'error') {
      return response;
    }

    // Cachear la respuesta
    const cache = await caches.open(RUNTIME_CACHE);
    cache.put(request, response.clone());
    console.log('[Service Worker] Cacheado:', request.url);
    
    return response;
  } catch (error) {
    console.error('[Service Worker] Fetch error:', error);
    
    // Intentar devolver del caché si hay error de red
    const cached = await caches.match(request);
    if (cached) {
      return cached;
    }

    // Si no hay caché disponible y es una imagen, devolver placeholder
    if (request.destination === 'image') {
      return new Response(
        '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect fill="#ddd" width="200" height="200"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="14" fill="#999">Offline</text></svg>',
        { headers: { 'Content-Type': 'image/svg+xml' } }
      );
    }

    return new Response('Recurso no disponible', { status: 503 });
  }
}

// Estrategia: Network First (buscar en red primero)
async function networkFirstStrategy(request) {
  try {
    const response = await fetch(request);
    if (!response || response.status !== 200) {
      return response;
    }

    // Cachear respuesta exitosa
    const cache = await caches.open(RUNTIME_CACHE);
    cache.put(request, response.clone());
    console.log('[Service Worker] Cacheado (Network):', request.url);

    return response;
  } catch (error) {
    console.error('[Service Worker] Network error:', error);
    
    // Intentar devolver del caché
    const cached = await caches.match(request);
    if (cached) {
      console.log('[Service Worker] Cache Fallback:', request.url);
      return cached;
    }

    // Respuesta offline por defecto
    if (request.destination === 'document') {
      return caches.match('/index.html');
    }

    return new Response('Sin conexión', { status: 503 });
  }
}

// Mensaje desde el cliente para limpiar caché
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    caches.delete(RUNTIME_CACHE).then(() => {
      console.log('[Service Worker] Caché de runtime limpiada');
    });
  }
});
