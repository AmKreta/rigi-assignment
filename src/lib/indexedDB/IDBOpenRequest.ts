


export default class IDBOpenRequest{
    openRequest: IDBOpenDBRequest;

    constructor(name:string, version:number, private cb?:Function){
        this.openRequest = indexedDB.open(name, version);
    }

    onSuccess(onSuccessCB:(this: IDBRequest<IDBDatabase>, ev: Event) => any){
        let cb = this.executeCB;
        this.openRequest.onsuccess = function(e){
            cb();
            return onSuccessCB.call(this, e);
        }
        return this;
    }

    onError(onErrorCB:(this: IDBRequest<IDBDatabase>, ev: Event) => any){
        this.openRequest.onerror= onErrorCB;
        return this;
    }

    onupgradeneeded(onUpgradeneededCB:(this: IDBRequest<IDBDatabase>, ev: Event) => any){
        this.openRequest.onupgradeneeded = onUpgradeneededCB;
        return this;
    }

    onBlocked(onBlockedCB:(this: IDBRequest<IDBDatabase>, ev: Event) => any){
        this.openRequest.onupgradeneeded = onBlockedCB;
        return this;
    }

    executeCB = ()=>{
        this.cb?.(this.openRequest.result);
    }
}