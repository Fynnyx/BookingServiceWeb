import type { Image } from "../strapi/Image";
import type { StrapiData } from "../strapi/StrapiData";

export interface Document {
    id: number;
    DocumentName: string;
    Document: StrapiData<Image>;
}