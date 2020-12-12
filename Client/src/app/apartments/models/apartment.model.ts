import { AmenityModel } from 'src/app/amenities/models/amenity.model';
import { RoomModel } from 'src/app/rooms/models/room.model';

export interface ApartmentModel{
    id: number;
    name: string;
    description: string;
    entry: string;
    floor?: number;
    number: string;
    size?: number;
    basePrice?: number;
    hasTerrace: boolean;
    maxOccupants?: number;
    mainImageUrl: string;
    addressId: string;
    rooms: Array<RoomModel>,
    amenities: Array<AmenityModel>,
}