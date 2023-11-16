export interface StrapiDataItem<T> {
    id: number;
    attributes: T;
}

export interface StrapiData<T> {
    data: StrapiDataItem<T>
}

export interface StrapiDataCollection<T> {
    data: StrapiDataItem<T>[]
}