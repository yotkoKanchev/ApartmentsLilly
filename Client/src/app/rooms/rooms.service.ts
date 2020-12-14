import { HttpClient , HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { CreateRoomModel } from './models/create-room.model';
import { RoomModel } from './models/room.model';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {
  private roomsPath = environment.apiUrl + 'Rooms';

  constructor(private http: HttpClient) { }

  getRoomTypes(): Observable<any> {
    return this.http.get<any>(this.roomsPath + '/' + 'roomTypes');
  }

  create(data, apartmentId): Observable<CreateRoomModel> {
    data.ApartmentId = apartmentId;
    return this.http.post<CreateRoomModel>(this.roomsPath, data)
  }

  getRoom(id: number): Observable<RoomModel> {
    return this.http.get<RoomModel>(this.roomsPath + '/' + id)
  }

  edit(data, id: number) {
    console.log(data)
    console.log(id)
    return this.http.put(this.roomsPath + '/' + id, data)
  }

  deleteRoom(id: number) {
    return this.http.delete(this.roomsPath + '/' + id);
  }

  getRooms(id: number): Observable<RoomModel[]> {
    return this.http.get<RoomModel[]>(this.roomsPath + `/All/${id}`)
  }
}
