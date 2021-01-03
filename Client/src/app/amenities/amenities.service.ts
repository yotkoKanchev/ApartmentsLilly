import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateAmenityModel } from './models/create-amenity.model';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AmenityModel } from './models/amenity.model';
import { EnumerationModel } from '../shared/models/enumeration.model';

@Injectable({
  providedIn: 'root'
})
export class AmenitiesService {
  amenitiesPath: string = environment.apiUrl + 'Amenities';

  constructor(
    private http: HttpClient,
  ) { }

  getImportanceTypes(): Observable<EnumerationModel> {
    return this.http.get<EnumerationModel>(this.amenitiesPath + '/' + 'ImportanceTypes');
  }

  create(data, apartmentId: number): Observable<CreateAmenityModel> {
    if (data.Owner == 'apartment') {
      data.apartmentId = apartmentId;
    } else {
      data.roomId = data.Owner;
      delete data.Owner;
    }
    return this.http.post<CreateAmenityModel>(this.amenitiesPath, data)
  }

  getAmenity(id: number, apartmentId: number) {
    return this.http.get<AmenityModel>(this.amenitiesPath + `?id=${id}&apartmentId=${apartmentId}`)
  }

  deleteAmenity(apartmentId: number, roomId: number, amenityId: number) {
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: {
        roomId: roomId,
        amenityId: amenityId
      }
    }

    if (!roomId) {
      options.body['apartmentId'] = apartmentId;
    }
    return this.http.delete(this.amenitiesPath, options);
  }
}
