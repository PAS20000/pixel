export declare type UseCaseAddResponse = Promise<void>;
export interface UseCaseAddRequest {
    item: object;
    store: IDBObjectStore;
    cache: any[];
}
export declare type CreateUseCaseAdd = (req: UseCaseAddRequest) => UseCaseAddResponse;
