// Strapi Item interface
import type { Booking } from "./Booking";
import type { Image } from "./strapi/Image";
import type { StrapiData, StrapiDataCollection } from "./strapi/StrapiData";

export interface Item {
    Name: string;
    Description: string;
    Price: number;
    Thumbnail: StrapiData<Image>;
    Images: StrapiDataCollection<Image>;
    BedCount: number;
    hasNetwork: boolean;
    hasGarden: boolean;
    hasPool: boolean;
    hasShower: boolean;
    hasBathtub: boolean;
    hasKitchen: boolean;
    bookings: StrapiDataCollection<Booking>;
    created_at: string;
    updated_at: string;
}
