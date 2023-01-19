import RequestError from "../errors/pixel-request"
import { CreateUseCaseAdd } from "../interfaces/pixel-use-case-add"

const UseCaseAdd : CreateUseCaseAdd = async ({ store, item, cache }) => new Promise(
    async (resolve : (value : any) => void, reject) => {
        const req = store.add(item)
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

export default UseCaseAdd