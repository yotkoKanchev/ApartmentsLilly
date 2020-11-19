export interface AddressListingModel {
    id: string;
    country: string;
    city: string;
    cityImageUrl?: string;
    postalCode?: string;
    neighborhood?: string;
    streetAddress: string;
}