declare class PixelTransactionError extends Error {
    constructor(error: DOMException | string | null);
}
export default PixelTransactionError;
