import { EnumerationModel } from "src/app/shared/models/enumeration.model"

export interface ReservationDetailsModel {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    additionalInfo: string,
    confirmation: string,
    from: Date,
    to: Date,
    adults: number,
    children: number,
    infants: number,
    status: EnumerationModel,
    apartmentId: number,
    apartmentName: string,
    apartmentMainImageUrl: string,
}