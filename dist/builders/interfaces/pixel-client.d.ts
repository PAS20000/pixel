import { UseCaseAddResponse } from "./pixel-use-case-add";
import { UseCasePutResponse } from "./pixel-use-case-put";
import { UseCaseReadResponse } from "./pixel-use-case-read";
export declare type PixelTable = `@${string}` | `${string}`;
export interface PixelClientRequest {
    keyPath?: string;
    storeName: string;
    dbName: string;
    version?: number;
    table: PixelTable[];
    permission?: IDBTransactionMode;
}
export declare type CoonectResponse = {
    idbStore: () => IDBObjectStore;
    add(item: object): UseCaseAddResponse;
    put(item: object): UseCasePutResponse;
    read(): UseCaseReadResponse;
    deleteAll(): any;
    bulkDelete(items: string[] | number[]): void;
};
export interface PixelClientResponse {
    connect(): Promise<CoonectResponse>;
}
export interface CreatePixelClient extends PixelClientResponse {
}
