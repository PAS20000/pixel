export type UseCasePutResponse = Promise<void>

export interface UseCasePutRequest {
    item : object
    store : IDBObjectStore
    cache : any[]
}

export type CreateUseCasePut = (req : UseCasePutRequest) => UseCasePutResponse