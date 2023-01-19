"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const browser_does_not_support_pixel_1 = __importDefault(require("./builders/errors/browser-does-not-support-pixel"));
const pixel_start_1 = __importDefault(require("./builders/errors/pixel-start"));
const pixel_transaction_1 = __importDefault(require("./builders/errors/pixel-transaction"));
const add_1 = __importDefault(require("./builders/usecases/add"));
const put_1 = __importDefault(require("./builders/usecases/put"));
const read_1 = __importDefault(require("./builders/usecases/read"));
class Pixel {
    request;
    constructor(request) {
        this.request = request;
    }
    connect() {
        const cache = [];
        if (!!indexedDB) {
            const dbName = this.request.dbName;
            const keyPath = this.request.keyPath;
            const permission = this.request.permission ?? 'readwrite';
            const storeName = this.request.storeName;
            const table = this.request.table;
            const uniques = table.filter(item => item.indexOf('@') !== -1);
            const version = this.request.version ?? 1;
            return new Promise((resolve, reject) => {
                const request = indexedDB.open(dbName, version);
                const getStore = (db) => {
                    const transaction = db.transaction([storeName], permission);
                    const objectStore = transaction.objectStore(storeName);
                    transaction.onerror = () => {
                        reject(new pixel_transaction_1.default(transaction.error));
                    };
                    transaction.onabort = () => {
                        reject(new pixel_transaction_1.default('These keys are unique ->' + JSON.stringify(uniques, null, 2)));
                    };
                    return objectStore;
                };
                request.onupgradeneeded = () => {
                    const database = request.result;
                    const objectStore = database.createObjectStore(storeName, { keyPath: keyPath ?? 'id' });
                    for (let item of table) {
                        const config = {
                            isUnique: item.indexOf('@') !== -1,
                            item: item.replace('@', '')
                        };
                        const ITEM = config.item;
                        const isUnique = config.isUnique;
                        objectStore.createIndex(ITEM, ITEM, { unique: isUnique });
                    }
                };
                request.onerror = async () => {
                    reject(new pixel_start_1.default(request.error));
                };
                request.onsuccess = () => {
                    const db = request.result;
                    const store = getStore(db);
                    resolve({
                        idbStore: store,
                        add: (item) => (0, add_1.default)({ store, item, cache }),
                        put: (item) => (0, put_1.default)({ store, item, cache }),
                        read: () => (0, read_1.default)({ store, cache }),
                        deleteAll: () => store.clear(),
                        bulkDelete: (items) => {
                            for (const id of items) {
                                store.delete(id);
                            }
                        }
                    });
                };
            });
        }
        else {
            throw new browser_does_not_support_pixel_1.default();
        }
    }
}
exports.default = Pixel;
