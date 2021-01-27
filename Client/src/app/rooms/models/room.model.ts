import { AmenityModel } from "src/app/amenities/models/amenity.model";
import { BedModel } from "src/app/beds/models/bed.model";
import { EnumerationModel } from "src/app/shared/models/enumeration.model";

export interface RoomModel {
    id: number;
    apartmentId: number;
    name: string;
    roomType: EnumerationModel;
    isSleepable: boolean;
    beds: Array<BedModel>;
    amenities: Array<AmenityModel>;
}