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

  // TODO add createAmenity model here
  create(data, apartmentId: number): Observable<CreateAmenityModel> {
    data.apartmentId = apartmentId;
    return this.http.post<CreateAmenityModel>(this.amenitiesPath, data)
  }

  getAmenity(id: number, apartmentId: number) {
    return this.http.get<AmenityModel>(this.amenitiesPath + `?id=${id}&apartmentId=${apartmentId}`)
  }

  edit(data, apartmentId: number, amenityId: number) {
    data.apartmentId = apartmentId;
    data.amenityId = amenityId;
    return this.http.put(this.amenitiesPath, data)
  }

  deleteAmenity(amenityId: number, apartmentId: number) {
    return this.http.delete(this.amenitiesPath + `?apartmentId=${apartmentId}&amenityId=${amenityId}`);
  }
}
