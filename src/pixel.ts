import BrowserDoesNotSupportPixelError from "./builders/errors/browser-does-not-support-pixel";
import PixelStartError from "./builders/errors/pixel-start";
import PixelTransactionError from "./builders/errors/pixel-transaction";
import { CoonectResponse, CreatePixelClient, PixelClientRequest } from "./builders/interfaces";
import UseCaseAdd from "./builders/usecases/add";
import UseCasePut from "./builders/usecases/put";
import UseCaseRead from "./builders/usecases/read";

class Pixel implements CreatePixelClient {
    constructor(
        private request : PixelClientRequest
    ) {}

    public connect() {
        const cache = [] as any[]
        if (!!indexedDB) {
            const dbName =  this.request.dbName
            const keyPath = this.request.keyPath
            const permission = this.request.permission ?? 'readwrite'
            const storeName = this.request.storeName
            const table = this.request.table
            const uniques = table.filter(
                item => item.indexOf('@') !== -1
            )
            const version = this.request.version ?? 1
            return new Promise((resolve : (value : CoonectResponse) => void , reject) => {
                const request = indexedDB.open(dbName, version) 
                const getStore = (db : IDBDatabase) => {
                    const transaction = db.transaction([storeName], permission)
                    const objectStore = transaction.objectStore(storeName)

                    transaction.onerror = () => {
                        reject(new PixelTransactionError(transaction.error))
                    }
                    
                    transaction.onabort = () => {
                        reject(new PixelTransactionError(
                            'These keys are unique ->' + JSON.stringify(uniques, null, 2)
                        ))
                    }
                    
                    return objectStore
                }
        
                request.onupgradeneeded = () => {
                    const database = request.result
                    const objectStore = database.createObjectStore(
                        storeName, 
                        { keyPath : keyPath ?? 'id' }
                    )
                    for (let item of table) {
                        const config = {
                            isUnique : item.indexOf('@') !== -1,
                            item : item.replace('@', '')
                        }
                        const ITEM = config.item
                        const isUnique = config.isUnique
                        objectStore.createIndex(ITEM, ITEM, { unique : isUnique })
                    }
                }

                request.onerror = async () => {
                    reject(new PixelStartError(request.error))
                }
                
                request.onsuccess = () => {
                    const db = request.result
                    const store = getStore(db)
                    
                    resolve({
                        idbStore : store,
                        add : (item) => UseCaseAdd({ store, item, cache }),
                        put : (item) => UseCasePut({ store, item, cache }),
                        read : () => UseCaseRead({ store, cache }),
                        deleteAll : () => store.clear(),
                        bulkDelete : (items) => {
                            for (const id of items) {
                                store.delete(id)
                            }
                        }
                    })
                }
            })
        } else {
            throw new BrowserDoesNotSupportPixelError()
        }
    }
}

export default Pixel