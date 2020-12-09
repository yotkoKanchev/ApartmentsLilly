import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { CreateRoomModel } from './models/create-room.model';
import { RoomModel } from './models/room.model';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {
  private roomsPath = environment.apiUrl + 'rooms';

  constructor(private http: HttpClient) { }

  getRoomTypes(): Observable<Array<string>> {
    return this.http.get<Array<string>>(this.roomsPath + '/' + 'roomTypes');
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
    console.log(`From Rooms Server - ${id} `)
    console.log(this.roomsPath + '/' + id)
    return this.http.delete(this.roomsPath + '/' + id);
  }
}
