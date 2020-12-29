import { Component, Input } from '@angular/core';
import { ModalService } from 'src/app/_modal';
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

  constructor(private modalService: ModalService,) { }

  getMap() {
    this.showMap = !this.showMap;
  }

  openModal(id: string) {
    this.modalService.open(id);
  }
}
