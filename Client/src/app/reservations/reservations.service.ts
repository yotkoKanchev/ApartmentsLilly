import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { SearchApartmentsModel } from '../apartments/models/search-apartments.model';
import { Observable } from 'rxjs';
import { CreateReservationModel } from './models/create-reservation.model';
import { UserInfoReservationModel } from './models/userInfo-reservation.model';
import { ReservationConfirmationModel } from './models/reservation-confirmation.model';
import { ReservationListingModel } from './models/reservation-listing.model';
import { ReservationDetailsModel } from './models/reservation-details.model';
import { EnumerationModel } from '../shared/models/enumeration.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {
  private reservationsPath = environment.apiUrl + "reservations";
  confirmationDetails: ReservationConfirmationModel;
  apartmentId: number;
  apartmentName: string;

  constructor(
    private http: HttpClient,
  ) { }

  sendReservationRequest(searchForm: SearchApartmentsModel, data: UserInfoReservationModel): Observable<CreateReservationModel> {

    const id = this.getApartmentId();
    const request = new CreateReservationModel();

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

    return this.http.post<CreateReservationModel>(this.reservationsPath, request);
  }

  getMine(): Observable<Array<ReservationListingModel>> {
    return this.http.get<Array<ReservationListingModel>>(this.reservationsPath + '/mine');
  }

  getAll(): Observable<Array<ReservationListingModel>> {
    return this.http.get<Array<ReservationListingModel>>(this.reservationsPath + '/all');
  }

  get(id: number): Observable<ReservationDetailsModel> {
    return this.http.get<ReservationDetailsModel>(this.reservationsPath + '/' + id);
  }

  cancel(id: number) {
    return this.http.put(this.reservationsPath + '/' + id, {});
  }

  getStatuses(): Observable<EnumerationModel> {
    return this.http.get<EnumerationModel>(this.reservationsPath + '/' + 'statuses');
  }

  setConfirmationDetails(data) {
    this.confirmationDetails = data;
  }

  getConfirmationDetails(): ReservationConfirmationModel {
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
