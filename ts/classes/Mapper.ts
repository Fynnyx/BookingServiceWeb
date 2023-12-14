import type { Booking } from "../interfaces/Booking";
import type { Item } from "../interfaces/Item";
import type { StrapiDataCollection } from "../interfaces/strapi/StrapiData";
import type { DisabledDate } from "../interfaces/vcal/DisabledDate";

export class Mapper {
    /**
     * bookingsToDisabledDates
     */
    public bookingsToDisabledDates(bookings: StrapiDataCollection<Booking>): DisabledDate[] {
        return bookings.data.map((booking) => {
            return {
                start: new Date(booking.attributes.StartDate),
                end: new Date(booking.attributes.EndDate),
            };
        });
    }
}