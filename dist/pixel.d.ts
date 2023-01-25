import { CoonectResponse, CreatePixelClient, PixelClientRequest } from "./builders/interfaces";
declare class Pixel implements CreatePixelClient {
    private request;
    constructor(request: PixelClientRequest);
    connect(): Promise<CoonectResponse>;
}
export default Pixel;
