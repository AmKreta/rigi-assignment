import IDBOpenRequest from "./IDBOpenRequest";

export default class IndexedDB{

    name:String;
    version:number;
    db:IDBDatabase | null = null;

    constructor(name:string, version:number){
        this.name = name;
        this.version = version;
    }

    openConnection(name:string, version:number){
        const idbOpenRequest = new IDBOpenRequest(name, version, (db:IDBDatabase)=>{
            this.db = db;
        });
        return idbOpenRequest;
    }

    createObjectStore(storeName:string, options?:IDBObjectStoreParameters){
        return new Promise((resolve, reject)=>{
            if(this.db?.objectStoreNames.contains(storeName)){
                reject(`DuplicateStoreName`);
                return;
            }
            const objectStore = this.db?.createObjectStore(storeName, options);
            resolve(objectStore);
        });
    }
}