"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pixel_request_1 = __importDefault(require("../errors/pixel-request"));
const UseCaseAdd = async ({ store, item, cache }) => new Promise((resolve, reject) => {
    const req = store.add(item);
    req.onsuccess = () => {
        const result = req.result;
        cache.push(result);
        resolve(result);
    };
    req.onerror = () => {
        reject(new pixel_request_1.default(req.error));
    };
});
exports.default = UseCaseAdd;
