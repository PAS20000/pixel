import RequestError from "../errors/pixel-request"
import { CreateUseCaseRead } from "../interfaces"

const UseCaseRead : CreateUseCaseRead = ({ store, cache }) => ({
    all : () => new Promise(
        (resolve : (value : any[]) => void, reject) => {
            const req = store.getAll()
            
            req.onsuccess = () => {
                if (cache.length) {
                    resolve(cache)
                } else {
                    resolve(req.result)
                }
            }
    
            req.onerror = () => {
                reject(new RequestError(req.error))
            }
        }
    ),
    query : (keys) => new Promise(
        (resolve : (value : any[]) => void, reject) => {
            const req = store.getAllKeys(keys)

            req.onsuccess = () => {
                if (cache.length) {
                    resolve(cache)
                } else {
                    resolve(req.result)
                }
            }
    
            req.onerror = () => {
                reject(new RequestError(req.error))
            }
        }
    ),
})

export default UseCaseRead