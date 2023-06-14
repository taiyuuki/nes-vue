function createDB<T = any>(dbName: string, storeName: string): DB<T> {
    const VERSION = 1
    const dateFactory = window.indexedDB
    const res = dateFactory.open(dbName, VERSION)
    let database!: IDBDatabase

    res.addEventListener('success', () => {
        database = res.result
    })

    res.addEventListener('error', () => {
        console.error('indexedDB load error')
    })

    res.addEventListener('upgradeneeded', () => {
        database = res.result
        if (!database.objectStoreNames.contains(storeName)) {
            database.createObjectStore(storeName, { keyPath: 'id' })
        }
    })
    function setItem(id: string, data: T) {
        database.transaction([storeName], 'readwrite').objectStore(storeName).put({ id, data })
    }
    function getItem(id: string, callback: (data: T) => void) {
        const res = database.transaction([storeName], 'readwrite').objectStore(storeName).get(id)
        res.addEventListener('success', () => {
            callback(res.result.data)
        })
    }
    function removeItem(id: string) {
        database.transaction([storeName], 'readwrite').objectStore(storeName).delete(id)
    }
    function clear() {
        database.transaction([storeName], 'readwrite').objectStore(storeName).clear()
    }
    return {
        setItem,
        getItem,
        removeItem,
        clear,
    }
}

export {
    createDB,
}

