export class BookingService {
    async bookRoom(roomId: number, startDate: string, endDate: string, userId: number) {
        const config = useRuntimeConfig();
        const response = await fetch(`${config.public.apiUrl}/bookings`, {
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