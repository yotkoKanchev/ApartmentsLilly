import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateAmenityModel } from './models/create-amenity.model';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AmenityModel } from './models/amenity.model';

@Injectable({
  providedIn: 'root'
})
export class AmenitiesService {
  amenitiesPath: string = environment.apiUrl + 'Amenities';
  constructor(private http: HttpClient) { }

  getImportanceTypes(): Observable<any> {
    return this.http.get<any>(this.amenitiesPath + '/' + 'ImportanceTypes');
  }

  create(data, apartmentId): Observable<CreateAmenityModel> {
    data.apartmentId = apartmentId;
    return this.http.post<CreateAmenityModel>(this.amenitiesPath, data)
  }

  getAmenity(id: number) {
    return this.http.get<AmenityModel>(this.amenitiesPath + '/' + id)
  }

  edit(data, id: number) {
    return this.http.put(this.amenitiesPath + '/' + id, data)
  }

  deleteAmenity(id: number, apartmentId: number) {
    return this.http.delete(this.amenitiesPath + `?id=${id}&apartmentId=${apartmentId}` );
  }
}
