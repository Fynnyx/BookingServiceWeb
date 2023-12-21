import type { StrapiError } from "./Error";

export interface StrapiDataItem<T> {
    id: number;
    attributes: T;
}

export interface StrapiData<T> {
    error: StrapiError | undefined;
    data: StrapiDataItem<T> | null;
}

export interface StrapiDataCollection<T> {
    error: StrapiError | undefined;
    data: StrapiDataItem<T>[] | null;
}