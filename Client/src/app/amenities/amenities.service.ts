import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateAmenityModel } from './models/create-amenity.model';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

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
    console.log(this.amenitiesPath)
    console.log(data)
    return this.http.post<CreateAmenityModel>(this.amenitiesPath, data)
  }
}
