declare class PixelRequestError extends Error {
    constructor(error: DOMException | null);
}
export default PixelRequestError;
