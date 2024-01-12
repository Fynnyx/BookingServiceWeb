// Strapi Item interface
import type { Booking } from "./Booking";
import type { Address } from "./components/Address";
import type { Contact } from "./components/Contact";
import type { Image } from "./strapi/Image";
import type { StrapiData, StrapiDataCollection } from "./strapi/StrapiData";

export interface Item {
    id: number;
    Name: string;
    Description: string;
    Price: number;
    Thumbnail: StrapiData<Image>;
    BedCount: number;
    hasNetwork: boolean;
    hasGarden: boolean;
    hasPool: boolean;
    hasShower: boolean;
    hasBathtub: boolean;
    hasKitchen: boolean;

    Images: StrapiDataCollection<Image>;
    Contact: Contact;
    Address: Address;

    bookings: StrapiDataCollection<Booking>;
    created_at: string;
    updated_at: string;
}
