export interface AddressModel {
    id: number;
    country: string;
    city: string;
    postalCode?: string;
    neighborhood?: string;
    streetAddress: string;
}