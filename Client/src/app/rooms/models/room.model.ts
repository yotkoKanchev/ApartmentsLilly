import { AmenityModel } from "src/app/amenities/models/amenity.model";
import { BedModel } from "src/app/beds/models/bed.model";

export interface RoomModel {
    id:number;
    apartmentId: number;
    name: string;
    roomType: any;
    isSleepable: boolean;
    beds: Array<BedModel>;
    amenities: Array<AmenityModel>;
}