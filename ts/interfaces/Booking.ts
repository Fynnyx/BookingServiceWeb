import type { Item } from "./Item";
import type { User } from "./User";
import type { StrapiData } from "./strapi/StrapiData";

export interface Booking {
    id: number;
    StartDate: Date;
    EndDate: Date;
    comment: string | null;

    ServiceFood: boolean;
    ServiceCleaning: boolean;
    ServiceMinibar: boolean;

    user: StrapiData<User>;
    item: Item;

    createdAt: Date;
    updatedAt: Date;
}