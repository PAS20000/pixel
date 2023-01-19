export type UseCaseAddResponse = Promise<void>

export interface UseCaseAddRequest {
    item : object
    store : IDBObjectStore
    cache : any[]
}

export type CreateUseCaseAdd = (req : UseCaseAddRequest) => UseCaseAddResponse