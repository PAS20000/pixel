class PixelTransactionError extends Error {
    constructor(error : DOMException | string | null) {
        super('PixelTransactionError')
        this.message = `[ Transaction was aborted ] : ${JSON.stringify(error, null, 2)}`
    }
}

export default PixelTransactionError