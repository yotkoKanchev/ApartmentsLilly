import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { CreateRoomModel } from './models/create-room.model';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {
  private apartmentPath = environment.apiUrl + 'rooms';

  constructor(private http: HttpClient) { }

  getRoomTypes() : Observable<Array<string>>{
    return this.http.get<Array<string>>(this.apartmentPath + '/' + 'roomTypes');
  }

  create(data): Observable<CreateRoomModel>{
    return this.http.post<CreateRoomModel>(this.apartmentPath, data)
  }
}
