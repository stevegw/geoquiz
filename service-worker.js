// IMPORTANT: Increment this version number whenever you deploy changes
const CACHE_VERSION = 'v50';
const CACHE_NAME = `geography-quiz-${CACHE_VERSION}`;
const urlsToCache = [
  './index.html',
  './manifest.json',
  './quizzes/Windchill-fundamentals-questions.json',
  './quizzes/Creo-fundamentals-1-questions.json',
  './quizzes/codebeamer-fundamentals-questions.json',
  './quizzes/Thingworx-fundamnetails-questions.json',
  './quizzes/Windchill-Objects-and-Types.json',
  './quizzes/Windchill-Introduction-And-Context-Admin.json',
  './quizzes/geography-questions.json'
];

// Listen for SKIP_WAITING message
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Install event - cache files
self.addEventListener('install', event => {
  console.log('Installing new service worker, version:', CACHE_VERSION);
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache:', CACHE_NAME);
        return cache.addAll(urlsToCache);
      })
  );
  // Force the waiting service worker to become the active service worker
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      // Take control of all pages immediately
      return self.clients.claim();
    })
  );
});

// Fetch event - Network first for HTML, cache for other resources
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Network-first strategy for HTML and JSON files to ensure fresh content
  if (event.request.headers.get('accept')?.includes('text/html') ||
      url.pathname.endsWith('.html') ||
      url.pathname.endsWith('.json') ||
      url.pathname === '/' || url.pathname === '') {
    event.respondWith(
      fetch(event.request, {
        cache: 'no-cache',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache'
        }
      })
        .then(response => {
          // Only cache successful responses
          if (response && response.status === 200) {
            const responseToCache = response.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, responseToCache);
            });
          }
          return response;
        })
        .catch(() => {
          // Fallback to cache if network fails (offline mode)
          return caches.match(event.request);
        })
    );
  }
  // Cache-first for other resources (CSS, JS, images, etc.)
  else {
    event.respondWith(
      caches.match(event.request)
        .then(response => {
          if (response) {
            return response;
          }

          return fetch(event.request).then(response => {
            // Check if valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            const responseToCache = response.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, responseToCache);
            });

            return response;
          });
        })
    );
  }
});
