import RequestError from "../errors/pixel-request"
import { CreateUseCasePut } from "../interfaces"

const UseCasePut : CreateUseCasePut = async ({ store, item, cache }) => new Promise(
    (resolve : (value : any) => void, reject) => {
        const req = store.put(item)
        req.onsuccess = () => {
            const result = req.result
            cache.push(result)
            resolve(result)
        }

        req.onerror = () => {
            reject(new RequestError(req.error))
        }
    }
)
export default UseCasePut