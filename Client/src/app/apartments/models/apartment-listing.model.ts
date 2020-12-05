import { SafeResourceUrl } from '@angular/platform-browser';

export interface ApartmentListingModel{
    id: number;
    name: string;
    size?: number;
    basePrice?: number;
    maxOccupants?: number;
    mainImageUrl: string;
    description: string;
    addressId: string;
    addressCountry: string;
    addressCity: string;
    addressNeighborhood: string;
    addressStreetAddress: string;
    fullAddress:SafeResourceUrl;
    bedroomCount:number;
    bedCount:number;
    bathroomCount:number;
    amenities: Array<string>;
}
