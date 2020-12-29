export interface SearchApartmentsModel {
    startDate: Date;
    endDate: Date;
    adults: number,
    children?: number,
    infants?: number,
}