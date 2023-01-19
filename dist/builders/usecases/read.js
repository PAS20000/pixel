"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pixel_request_1 = __importDefault(require("../errors/pixel-request"));
const UseCaseRead = ({ store, cache }) => {
    return {
        all: () => new Promise((resolve, reject) => {
            const req = store.getAll();
            req.onsuccess = () => {
                if (cache.length) {
                    resolve(cache);
                }
                else {
                    resolve(req.result);
                }
            };
            req.onerror = () => {
                reject(new pixel_request_1.default(req.error));
            };
        }),
        query: (keys) => new Promise((resolve, reject) => {
            const req = store.getAllKeys(keys);
            req.onsuccess = () => {
                if (cache.length) {
                    resolve(cache);
                }
                else {
                    resolve(req.result);
                }
            };
            req.onerror = () => {
                reject(new pixel_request_1.default(req.error));
            };
        }),
    };
};
exports.default = UseCaseRead;
