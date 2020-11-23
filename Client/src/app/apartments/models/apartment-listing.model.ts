export interface ApartmentListingModel{
    id: number;
    name: string;
    size?: number;
    basePrice?: number;
    maxOccupants?: number;
    mainImageUrl: string;
    addressId: string;
    addressCountry: string;
    addressCity: string;
    addressNeighborhood: string;
    addressStreetAddress: string;
}
