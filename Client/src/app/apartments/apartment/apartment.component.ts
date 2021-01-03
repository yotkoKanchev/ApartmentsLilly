import { Component, Input, OnInit } from '@angular/core';
import { ReservationsService } from 'src/app/reservations/reservations.service';
import { ModalService } from 'src/app/_modal';
import { ApartmentListingModel } from '../models/apartment-listing.model';
import { SearchApartmentsModel } from '../models/search-apartments.model';

@Component({
  selector: 'app-apartment',
  templateUrl: './apartment.component.html',
  styleUrls: ['./apartment.component.css']
})
export class ApartmentComponent implements OnInit {
  @Input() apartment: ApartmentListingModel;
  @Input() searchApartmentForm: SearchApartmentsModel;
  showMap: boolean;

  constructor(private modalService: ModalService, private reservationService: ReservationsService) { }

  ngOnInit(): void {
    // TODO pass apartmentId to reservation service trough create-request component!
  }

  getMap() {
    this.showMap = !this.showMap;
  }

  onButtonClick() {
    this.reservationService.setApartmentId(this.apartment.id);
    this.reservationService.setApartmentName(this.apartment.name);
  }
}

