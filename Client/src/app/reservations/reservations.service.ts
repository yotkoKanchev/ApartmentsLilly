import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { SearchApartmentsModel } from '../apartments/models/search-apartments.model';
import { Observable } from 'rxjs';
import { SendRequestModel } from './models/send-reguest.model';
import { ProfileModel } from '../profiles/models/profile.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {
  private reservationsPath = environment.apiUrl + "reservations";

  constructor(
    private http: HttpClient, private router: Router
  ) { }

  sendRequest(apartmentId: number, searchForm: SearchApartmentsModel, data: ProfileModel): Observable<SendRequestModel> {
    const request = new SendRequestModel();
    request.apartmentId = apartmentId;
    request.firstName = data.firstName;
    request.lastName = data.lastName;
    request.email = data.email;
    request.phoneNumer = data.phoneNumber;
    request.from = searchForm.startDate;
    request.to = searchForm.endDate;
    request.adults = searchForm.adults;
    request.children = searchForm.children;
    request.infants = searchForm.infants;
    
    return this.http.post<SendRequestModel>(this.reservationsPath, request);
  }
}
