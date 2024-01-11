export interface Address {
    address: string;
    geohash: string;
    coordinates: {
        lat: number;
        lng: number;
    };
}
