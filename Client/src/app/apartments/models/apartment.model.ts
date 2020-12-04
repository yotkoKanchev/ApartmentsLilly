export interface ApartmentModel{
    id: number;
    name: string;
    description: string;
    entry: string;
    floor?: number;
    number: string;
    size?: number;
    basePrice?: number;
    hasTerrace: boolean;
    maxOccupants?: number;
    mainImageUrl: string;
    addressId: string;
}