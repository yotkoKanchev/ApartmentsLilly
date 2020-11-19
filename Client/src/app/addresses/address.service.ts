import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { CreateAddressModel } from './models/create-address.model';
import { AddressListingModel } from './models/list-address.model';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private addressPath = environment.apiUrl + 'addresses';

  constructor(private http: HttpClient) { }

  create(data): Observable<CreateAddressModel> {
    return this.http.post<CreateAddressModel>(this.addressPath, data)
  }

  getAddresses() {
    return this.http.get<Array<AddressListingModel>>(this.addressPath)
  }

  getAddress(id): Observable<AddressListingModel> {
    return this.http.get<AddressListingModel>(this.addressPath + '/' + id)
  }

  editAddress(data) {
    return this.http.put(this.addressPath + '/' + data.id, data)
  }

  deleteAddress(id: string) {
    return this.http.delete(this.addressPath + '/' + id)
  }
}
