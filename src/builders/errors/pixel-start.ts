class PixelStartError extends Error {
    constructor(error : any) {
        super('PixelStartError')
        this.message = JSON.stringify(error, null, 2)
    }
}

export default PixelStartError