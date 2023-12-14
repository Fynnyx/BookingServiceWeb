import type { Booking } from "./Booking";
import type { StrapiDataCollection } from "./strapi/StrapiData";

export interface User {
    id: number;
    username: string;
    email: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;

    bookings: StrapiDataCollection<Booking>;

    createdAt: string;
    updatedAt: string;
}