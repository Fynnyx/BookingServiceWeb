export class UrlService {

    apiUrl: string;

    constructor() {
        this.apiUrl = process.env.API_URL || "http://localhost:1337";
    }

    getApiUrl(): string {
        return this.apiUrl;
    }
}