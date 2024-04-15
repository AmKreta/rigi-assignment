export default class ObjectStore{

    constructor(private store:IDBObjectStore, private db:IDBDatabase){}

    get(){
        return new Promise((resolve, reject) => {
            const request =this.store.get(this.store.name);
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    add(value: any, key?: any): Promise<void> {
        return new Promise((resolve, reject) => {
            const request = this.store.add(value, key);
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }

    addMany(entries: { key?: any, value: any }[]): Promise<void[]> {
        const promises: Promise<void>[] = [];
        entries.forEach(({ key, value }) => {
            promises.push(this.add(value, key));
        });
        return Promise.all(promises);
    }

    put(value: any, key?: any): Promise<void> {
        return new Promise((resolve, reject) => {
            const request = this.store.put(value, key);
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }

    putMany(entries: { key: any, value: any }[]): Promise<void[]> {
        const promises: Promise<void>[] = [];
        entries.forEach(({ key, value }) => {
            promises.push(this.put(value, key));
        });
        return Promise.all(promises);
    }

    delete(key: any): Promise<void> {
        return new Promise((resolve, reject) => {
            const request = this.store.delete(key);
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }

    deleteMany(keys: any[]): Promise<void[]> {
        const promises: Promise<void>[] = [];
        keys.forEach(key => {
            promises.push(this.delete(key));
        });
        return Promise.all(promises);
    }
}