const dateBase = window.indexedDB
const version = 1
const dbName = 'nes-vue'
const storeName = 'save_data'
const res = dateBase.open(dbName, version)
let db: IDBDatabase

res.onsuccess = (e) => {
  if (e.target) {
    db = (<IDBOpenDBRequest>e.target).result
  }
}

res.onerror = () => {
  console.error('indexedDB load error')
}

res.onupgradeneeded = (e) => {
  if (e.target) {
    db = (<IDBOpenDBRequest>e.target).result
    if (!db.objectStoreNames.contains(storeName)) {
      db.createObjectStore(storeName, { keyPath: 'id' })
    }
  }
}

export interface SaveDataOptions {
  data: any
  onSuccess: (this: IDBRequest<IDBValidKey>, ev: Event) => any
  onError: (code: number | undefined) => any
}

export interface LoadDataOptions {
  id: string | number
  onSuccess: (res: IDBRequest<any>) => any
  onError: (this: IDBTransaction, ev: Event) => any
}

export interface PutDataOptions {
  data: any
  onSuccess: () => any
}

export interface RemoveDataOptions {
  id: string | number
  onSuccess: (this: IDBRequest<undefined>, ev: Event) => any
}

export function saveData({ data, onSuccess, onError }: SaveDataOptions) {
  const res = db.transaction([storeName], 'readwrite').objectStore(storeName).add(data)
  res.onsuccess = onSuccess
  res.onerror = (e) => {
    const error = (<IDBRequest>e.target).error
    onError(error?.code)
  }
}

export function putData({ data, onSuccess }: PutDataOptions) {
  const res = db.transaction([storeName], 'readwrite').objectStore(storeName).put(data)
  res.onsuccess = onSuccess
}

export function loadData({ id, onSuccess, onError }: LoadDataOptions) {
  const transaction = db.transaction([storeName])
  const res = transaction.objectStore(storeName).get(id)
  res.onsuccess = () => {
    onSuccess(res)
  }
  transaction.onerror = onError
}

export function removeData({ id, onSuccess }: RemoveDataOptions) {
  const transaction = db.transaction([storeName], 'readwrite')
  const objectStore = transaction.objectStore(storeName)
  const res = objectStore.delete(id)
  res.onsuccess = onSuccess
}

export function clearData() {
  const transaction = db.transaction([storeName], 'readwrite')
  const objectStore = transaction.objectStore(storeName)
  objectStore.clear()
}