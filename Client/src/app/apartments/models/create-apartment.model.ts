export interface CreateApartmentModel {
    addressId: number;
    name: string;
    description: string;
    entry: string;
    floor: number;
    number: string;
    size: number;
    basePrice: number;
    hasTerrace: boolean;
    maxOccupants: number;
    mainImageUrl: string;
}