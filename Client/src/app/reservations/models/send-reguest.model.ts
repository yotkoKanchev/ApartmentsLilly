export class SendRequestModel {
    apartmentId: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    additionalInfo: string;
    from: Date;
    to: Date;
    adults: number;
    children?: number;
    infants?: number;
}