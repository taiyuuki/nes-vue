class DB<T> {
    private static readonly VERSION = 1
    _dbName: string
    _storeName: string
    _dateFactory: IDBFactory
    _database!: IDBDatabase
    _res: IDBRequest
    constructor(dbName: string, storeName: string) {
        this._dbName = dbName
        this._storeName = storeName
        this._dateFactory = window.indexedDB
        this._res = this._dateFactory.open(this._dbName, DB.VERSION)

        this._res.addEventListener('success', () => {
            this._database = this._res.result
        })
        this._res.addEventListener('error', () => {
            console.error('indexedDB load error')
        })
        this._res.addEventListener('upgradeneeded', () => {
            this._database = this._res.result
            if (!this._database.objectStoreNames.contains(this._storeName)) {
                this._database.createObjectStore(this._storeName, { keyPath: 'id' })
            }
        })
    }

    get _store() {
        return this._database.transaction([this._storeName], 'readwrite').objectStore(this._storeName)
    }

    setItem(id: string, data: T) {
        this._store.put({ id, data })
    }

    getItem(id: string, callback: (data: T) => void) {
        const res = this._store.get(id)
        res.addEventListener('success', () => {
            callback(res.result.data)
        })
    }

    removeItem(id: string) {
        this._store.delete(id)
    }

    clear() {
        this._store.clear()
    }
}

function createDB<T = any>(dbName: string, storeName: string): DB<T> {
    return new DB(dbName, storeName)
}

export {
    createDB,
}

