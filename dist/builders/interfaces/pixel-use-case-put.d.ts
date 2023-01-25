export declare type UseCasePutResponse = Promise<void>;
export interface UseCasePutRequest {
    item: object;
    store: IDBObjectStore;
    cache: any[];
}
export declare type CreateUseCasePut = (req: UseCasePutRequest) => UseCasePutResponse;
