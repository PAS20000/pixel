class PixelRequestError extends Error {
    constructor(error : DOMException | null) {
        super('PixelRequestError')
        this.message = `[ Transaction was aborted ] : ${JSON.stringify(error, null, 2)}`
    }
}

export default PixelRequestError