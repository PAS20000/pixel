"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PixelTransactionError extends Error {
    constructor(error) {
        super('PixelTransactionError');
        this.message = `[ Transaction was aborted ] : ${JSON.stringify(error, null, 2)}`;
    }
}
exports.default = PixelTransactionError;
