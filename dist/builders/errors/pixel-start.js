"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PixelStartError extends Error {
    constructor(error) {
        super('PixelStartError');
        this.message = JSON.stringify(error, null, 2);
    }
}
exports.default = PixelStartError;
