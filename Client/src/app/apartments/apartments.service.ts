import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateApartmentModel } from './models/create-apartment.model';
import { ApartmentModel } from './models/apartment.model';
import { ApartmentListingModel } from './models/apartment-listing.model';
import { SearchApartments } from './models/search-apartments.model';

@Injectable({
  providedIn: 'root'
})
export class ApartmentsService {
  private apartmentPath = environment.apiUrl + 'apartments';

  constructor(private http: HttpClient) { }

  // todo work here
  create(data): Observable<CreateApartmentModel> {
    data.addressId = "1cd54ca6-b3c5-4449-a7b6-4f57028617df";
    return this.http.post<CreateApartmentModel>(this.apartmentPath, data)
  }

  // todo work here
  getAvailableApartments(data){
    return this.http.get<Array<ApartmentListingModel>>(this.apartmentPath + `/search?startDate=${data.startDate}&endDate=${data.endDate}`);
  }

  // +all
  getApartments() {
    return this.http.get<Array<ApartmentListingModel>>(this.apartmentPath + '/all')
  }

  getApartment(id): Observable<ApartmentModel> {
    return this.http.get<ApartmentModel>(this.apartmentPath + '/' + id)
  }

  editApartment(data) {
    return this.http.put(this.apartmentPath + '/' + data.id, data)
  }

  deleteApartment(id: string) {
    return this.http.delete(this.apartmentPath + '/' + id)
  }
}
