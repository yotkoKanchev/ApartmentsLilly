import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { SearchApartmentsModel } from '../apartments/models/search-apartments.model';
import { Observable } from 'rxjs';
import { SendRequestModel } from './models/send-reguest.model';
import { CreateRequestUserDataModel } from './models/create-request-userData.model';
import { ConfirmationModel } from './models/confirmation.model';
import { RequestListingModel } from './models/request-listing.model';
import { RequestDetailsModel } from './models/request-details.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {
  private reservationsPath = environment.apiUrl + "reservations";
  confirmationDetails: ConfirmationModel;
  apartmentId: number;
  apartmentName: string;

  constructor(
    private http: HttpClient,
  ) { }

  sendRequest(searchForm: SearchApartmentsModel, data: CreateRequestUserDataModel): Observable<SendRequestModel> {

    const id = this.getApartmentId();
    const request = new SendRequestModel();

    request.apartmentId = id;
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

  getRequest(id: number): Observable<RequestDetailsModel> {
    return this.http.get<RequestDetailsModel>(this.reservationsPath + `/requests/${id}`);
  }

  cancelRequest(id: number) {
    return this.http.put(this.reservationsPath + `/requests/${id}`, {});
  }

  setConfirmationDetails(data) {
    this.confirmationDetails = data;
  }

  getConfirmationDetails(): ConfirmationModel {
    return this.confirmationDetails;
  }

  setApartmentId(id: number) {
    this.apartmentId = id;
  }

  setApartmentName(name: string) {
    this.apartmentName = name;
  }

  getApartmentId() {
    return this.apartmentId;
  }

  getApartmentName() {
    return this.apartmentName;
  }
}
