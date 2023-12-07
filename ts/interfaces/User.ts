import type { Booking } from "./Booking";

export interface User {
    id: number;
    username: string;
    email: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;

    cart: Cart;
    bookings: Booking[];

    createdAt: string;
    updatedAt: string;
}