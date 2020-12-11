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

  create(data, type:string, parentId:number): Observable<CreateAmenityModel>{
    data.id = parentId;
    data.type = type;
    return this.http.post<CreateAmenityModel>(this.amenitiesPath, data)
  }
}
