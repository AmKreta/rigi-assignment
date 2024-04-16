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

self.addEventListener('install',e=>{

});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.url.includes('rigi-react-assignment')) {
    return navigator.onLine 
      ? saveToIndexedDB(event)
      : readFromIndexedDB(event);
  }
  else if(
    ['png','jpg','jpeg','gif','webp','svg','mp4','webm'].some(extension=>request.url.endsWith(extension))
    || ['githubusercontent','picsum'].some(word=>request.url.includes(word))
  ){
    return navigator.onLine 
      ?saveToCache(event)
      :readFromCache(event);
  }
});


function readDataFromPost(page, limit){
  return new Promise((resolve, reject)=>{
    let postTransaction = db.transaction('post','readonly');
    let postStore = postTransaction.objectStore('post');
    let request = postStore.getAll();
    request.onsuccess = (e)=>{
      resolve({data: e.target.result});
    }
    request.onerror = e =>{
      reject(e.target.error);
    }
  });
}


function addDataToPost(data){
  let postTransaction = db.transaction('post','readwrite');
  const postStore = postTransaction.objectStore('post');
  data.forEach((post)=>{
    postStore.put(post);
  });
}


function readDataFromUser(){
  return new Promise((resolve, reject)=>{
    let userTransaction = db.transaction('user','readonly');
    const userStore = userTransaction.objectStore('user');
    const request = userStore.getAll();
    request.onsuccess = (e)=>{
      resolve(e.target.result);
    }
    request.onerror = e =>{
      reject(e.target.eror);
    }
  });
}


function addDataToUser(data){
  let userTransaction = db.transaction('user','readwrite');
  const postStore = userTransaction.objectStore('user');
  data.forEach((user)=>{
    postStore.put(user);
  });
}


function saveToCache(event){
  const { request } = event;
  const fetchRequest = request.clone();
  event.respondWith(fetch(fetchRequest)
    .then((response) => {
      if (!response) {
        return response;
      }
      const responseToCache = response.clone();
      caches
        .open(STATIC_CACHE)
        .then((cache) => {
          cache.put(request, responseToCache);
        });
      return response;
  }));
}


function readFromCache(event){
  const { request } = event;
  event.respondWith(
    caches
      .match(request)
      .then((response) => {
        if (response) {
          return response;
        }
      })
      .catch(err=>{
        console.log('failed to read from cache', err);
        return err;
      })
  )
}


function saveToIndexedDB(event){
  const { request } = event;
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
    });
}


function readFromIndexedDB(event){
  const { request } = event;
  if(request.url.endsWith('users')){
    return event.respondWith(
      readDataFromUser()
      .then(res=> new Response(JSON.stringify(res)))
    );
  }
  else{
    const url = new URL(request.url);
    const page = +url.searchParams.get('page');
    const limit = +url.searchParams.get('limit');
    return event.respondWith(
      readDataFromPost(page, limit)
      .then(res=>new Response(JSON.stringify(res)))
    );
  }
}
