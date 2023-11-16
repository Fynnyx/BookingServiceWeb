// Strapi Item interface
import type { Booking } from "./Booking";
import type { Image } from "./strapi/Image";
import type { StrapiData, StrapiDataCollection } from "./strapi/StrapiData";

export interface Item {
    name: string;
    description: string;
    price: number;
    thumbnail: StrapiData<Image>;
    images: StrapiDataCollection<Image>;
    bookings: StrapiDataCollection<Booking>;
    created_at: string;
    updated_at: string;
}
