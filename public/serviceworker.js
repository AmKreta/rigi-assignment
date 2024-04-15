const VERSION = 1;
const STATIC_CACHE = 'static-cache';

let db;
const idbOpenRequest = indexedDB.open('data');
idbOpenRequest.onsuccess = (e) =>{
  db = e.target.result;
}

idbOpenRequest.onupgradeneeded = (e) =>{
  db = e.target.result;
  db.createObjectStore('user',{keyPath:'id'});
  db.createObjectStore('post',{keyPath:'id'});
}

function addDataToPost(data){
  console.log({post:data});
  let postTransaction = db.transaction('post','readwrite');
  const postStore = postTransaction.objectStore('post');
  data.forEach((post)=>{
    postStore.put(post);
  });
}

function addDataToUser(data){
  console.log({user:data});
  let userTransaction = db.transaction('user','readwrite');
  const postStore = userTransaction.objectStore('user');
  data.forEach((user)=>{
    postStore.put(user);
  });
}

self.addEventListener('install',e=>{

});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.url.includes('rigi-react-assignment')) {
    const fetchRequest = request.clone();
    return fetch(fetchRequest)
      .then(async (response) => {
        let json = await response.json();
        if(request.url.endsWith('users')){
          addDataToUser(json);
        }
        else{
          addDataToPost(json.data);
        }
        return response;
      })
      .catch(err=>{
        console.log(err, request);
        return err;
    })
  }
  else if(
    ['png','jpg','jpeg','gif','webp','svg','mp4','webm'].some(extension=>request.url.endsWith(extension))
    || ['githubusercontent','picsum'].some(word=>request.url.includes(word))
  ){
    saveToCache();
  }

  function saveToCache(){
    event.respondWith(
      caches.match(request)
        .then((response) => {
          if (response) {
            return response;
          }
          const fetchRequest = request.clone();
          return fetch(fetchRequest).then((response) => {
            if (!response) {
              return response;
            }
            const responseToCache = response.clone();
            caches.open(STATIC_CACHE)
              .then((cache) => {
                cache.put(request, responseToCache);
              });
            return response;
          });
        })
    );
  }
});
