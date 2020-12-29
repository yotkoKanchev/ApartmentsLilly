import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { SearchApartmentsModel } from '../apartments/models/search-apartments.model';
import { Observable } from 'rxjs';
import { SendRequestModel } from './models/send-reguest.model';
import { CreateRequestUserDataModel } from './models/create-request-userData.model';
import { ConfirmationModel } from './models/confirmation.model';
import { RequestListingModel } from './models/request-listing.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {
  private reservationsPath = environment.apiUrl + "reservations";
  confirmationDetails: ConfirmationModel;
  constructor(
    private http: HttpClient, private router: Router
  ) { }

  sendRequest(apartmentId: number, searchForm: SearchApartmentsModel, data: CreateRequestUserDataModel): Observable<SendRequestModel> {
    const request = new SendRequestModel();
    request.apartmentId = apartmentId;
    request.firstName = data.firstName;
    request.lastName = data.lastName;
    request.email = data.email;
    request.phoneNumber = data.phoneNumber;
    request.additionalInfo = data.additionalInfo;
    request.from = searchForm.startDate;
    request.to = searchForm.endDate;
    request.adults = searchForm.adults;
    request.children = !searchForm.children ? 0 : searchForm.children;
    request.infants = !searchForm.infants ? 0 : searchForm.infants;
    return this.http.post<SendRequestModel>(this.reservationsPath + '/request', request);
  }

  getRequests(): Observable<Array<RequestListingModel>> {
    return this.http.get<Array<RequestListingModel>>(this.reservationsPath + '/requests');
  }

  setConfirmationDetails(data) {
    this.confirmationDetails = data;
  }

  getConfirmationDetails(): ConfirmationModel {
    return this.confirmationDetails;
  }
}
