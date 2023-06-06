class DB<T = any> {
    public static readonly VERSION = 1
    dateFactory: IDBFactory
    storeName: string
    dbName: string
    res: IDBOpenDBRequest
    database!: IDBDatabase
    constructor(dbName: string, storeName: string) {
        this.dateFactory = window.indexedDB
        this.dbName = dbName
        this.storeName = storeName
        this.res = this.dateFactory.open(dbName, DB.VERSION)

        this.res.addEventListener('success', () => {
            this.database = this.res.result
        })

        this.res.addEventListener('error', () => {
            console.error('indexedDB load error')
        })

        this.res.addEventListener('upgradeneeded', () => {
            this.database = this.res.result
            if (!this.database.objectStoreNames.contains(storeName)) {
                this.database.createObjectStore(storeName, { keyPath: 'id' })
            }
        })
    }

    setItem(id: string, data: T) {
        this.database.transaction([this.storeName], 'readwrite').objectStore(this.storeName).put({ id, data })
        this.database.addEventListener('error', () => {
            console.error('indexedDB save error')
        })
    }

    getItem(id: string, callback: (data: T) => void) {
        const res = this.database.transaction([this.storeName], 'readwrite').objectStore(this.storeName).get(id)
        this.database.addEventListener('error', () => {
            console.error('indexedDB load error')
        })
        res.addEventListener('success', () => {
            callback(res.result.data)
        })
    }

    removeItem(id: string) {
        this.database.transaction([this.storeName], 'readwrite').objectStore(this.storeName).delete(id)
    }

    clear() {
        this.database.transaction([this.storeName], 'readwrite').objectStore(this.storeName).clear()
    }
}

export {
    DB,
}

