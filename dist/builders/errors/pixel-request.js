"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PixelRequestError extends Error {
    constructor(error) {
        super('PixelRequestError');
        this.message = `[ Transaction was aborted ] : ${JSON.stringify(error, null, 2)}`;
    }
}
exports.default = PixelRequestError;
