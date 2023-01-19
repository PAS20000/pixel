export interface UseCaseReadResponse<T = any> {
    all() : Promise<T[]>
    query(items : string[]) : Promise<T[]>
}

export interface UseCaseReadRequest {
    store : IDBObjectStore
    cache : any[]
}

export type CreateUseCaseRead = (req : UseCaseReadRequest) => UseCaseReadResponse