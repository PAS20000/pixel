class BrowserDoesNotSupportPixelError extends Error {
    constructor() {
        super('BrowserDoesNotSupportPixelError')
        this.message = "Your browser doesn't support a stable version of pixel. Such and such feature will not be available."
    }
}

export default BrowserDoesNotSupportPixelError