<!-- PWA SERVICE WORKER VIA INLINE BLOB (SOLUSI DIPERLUKAN UNTUK BLOGSPOT) -->
<script type='text/javascript'>
//<![CDATA[
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      // Kode Service Worker dimasukkan langsung agar dianggap Se-Domain oleh Chrome
      const swCode = `
        const CACHE_NAME = 'pwa-blogspot-v1';
        self.addEventListener('install', e => { self.skipWaiting(); });
        self.addEventListener('activate', e => { e.waitUntil(clients.claim()); });
        self.addEventListener('fetch', e => {
          e.respondWith(
            fetch(e.request).catch(() => caches.match(e.request))
          );
        });
      `;
      
      const blob = new Blob([swCode], { type: 'text/javascript' });
      const blobUrl = URL.createObjectURL(blob);

      navigator.serviceWorker.register(blobUrl)
        .then(function(reg) {
          console.log('PWA SW Berhasil Aktif!', reg.scope);
        })
        .catch(function(err) {
          console.error('Gagal SW:', err);
        });
    });
  }
//]]>
</script>
