// let cacheAllowed = /.+\.(js|css|png|jpg|jpeg|php|ico|json)$/;

self.addEventListener("fetch", function(event) {
  // console.log(event.request.url);
  // if (cacheAllowed.test(event.request.url)) {
  //   event.respondWith(
  //     caches.match(event.request.url).then(response => {
  //       if (response) {
  //         return response;
  //       } else {
  //         return fetch(event.request)
  //           .then(res => {
  //             return caches.open("cache-version-1").then(cache => {
  //               cache.put(event.request.url, res.clone());
  //               return res;
  //             });
  //           })
  //           .catch(err => {
  //             console.log(err);
  //           });
  //       }
  //     })
  //   );
  // }
});
