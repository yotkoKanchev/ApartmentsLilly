import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { CreateAddressModel } from './models/create-address.model';
import { AddressModel } from './models/address.model';

@Injectable({
  providedIn: 'root',
})
export class AddressesService {
  private addressPath = environment.apiUrl + 'addresses';

  constructor(private http: HttpClient) { }

  create(data): Observable<CreateAddressModel> {
    return this.http.post<CreateAddressModel>(this.addressPath, data)
  }

  getAddresses() {
    return this.http.get<Array<AddressModel>>(this.addressPath)
  }

  getAddress(id): Observable<AddressModel> {
    return this.http.get<AddressModel>(this.addressPath + '/' + id)
  }

  editAddress(data) {
    return this.http.put(this.addressPath + '/' + data.id, data)
  }

  deleteAddress(id: string) {
    return this.http.delete(this.addressPath + '/' + id)
  }
}
