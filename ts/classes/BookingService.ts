import { UrlService } from "./UrlService";

export class BookingService {

    urlService: UrlService;

    constructor() {
        this.urlService = new UrlService();
    }

    async bookRoom(roomId: number, startDate: string, endDate: string, userId: number) {
        const response = await fetch(`${this.urlService.getApiUrl()}/bookings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                data: {
                    
                }
            })
        });
    }
}