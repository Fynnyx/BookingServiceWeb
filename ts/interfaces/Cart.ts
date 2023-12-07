import type { Item } from "./Item";
import type { StrapiDataCollection } from "./strapi/StrapiData";

export interface Cart {
    items: StrapiDataCollection<Item>;
    user: 
}