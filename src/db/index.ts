import { DB } from '@taiyuuki/utils'

function createDB<T = any>(dbName: string, storeName: string): DB<T> {
    return new DB(dbName, storeName)
}

type DBInstance<T = any> = InstanceType<typeof DB<T>>

export type { DBInstance }

export { createDB }
