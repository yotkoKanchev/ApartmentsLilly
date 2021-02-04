import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { CreateRoomModel } from './models/create-room.model';
import { RoomModel } from './models/room.model';
import { EnumerationModel } from '../shared/models/enumeration.model';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {
  private roomsPath = environment.apiUrl + 'Rooms';
  private id: number;
  constructor(
    private http: HttpClient,
  ) { }

  getRoomTypes(): Observable<EnumerationModel> {
    return this.http.get<EnumerationModel>(this.roomsPath + '/' + 'roomTypes');
  }

  create(data, apartmentId): Observable<CreateRoomModel> {
    data.ApartmentId = apartmentId;
    return this.http.post<CreateRoomModel>(this.roomsPath, data)
  }

  getRoom(id: number): Observable<RoomModel> {
    return this.http.get<RoomModel>(this.roomsPath + '/' + id)
  }

  edit(data, id: number) {
    return this.http.put(this.roomsPath + '/' + id, data)
  }

  deleteRoom(id: number) {
    return this.http.delete(this.roomsPath + '/' + id);
  }

  getRooms(id: number): Observable<RoomModel[]> {
    return this.http.get<RoomModel[]>(this.roomsPath + `/All/${id}`)
  }

  setRoomId(id: number) {
    this.id = id;
  }

  getRoomId(): number {
    return this.id;
  }
}
