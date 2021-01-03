import { Component, Input } from '@angular/core';
import { ReservationsService } from 'src/app/reservations/reservations.service';
import { ApartmentListingModel } from '../models/apartment-listing.model';
import { SearchApartmentsModel } from '../models/search-apartments.model';

@Component({
  selector: 'app-apartment',
  templateUrl: './apartment.component.html',
  styleUrls: ['./apartment.component.css']
})
export class ApartmentComponent {
  @Input() apartment: ApartmentListingModel;
  @Input() searchApartmentForm: SearchApartmentsModel;
  showMap: boolean;

  constructor(
    private reservationService: ReservationsService,
  ) { }

  getMap() {
    this.showMap = !this.showMap;
  }

  onButtonClick() {
    this.reservationService.setApartmentId(this.apartment.id);
    this.reservationService.setApartmentName(this.apartment.name);
  }
}

