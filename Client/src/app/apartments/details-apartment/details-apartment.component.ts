import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApartmentsService } from '../apartments.service';
import { ApartmentModel } from '../models/apartment.model';
import { ModalService } from '../../_modal';
import { RoomsService } from 'src/app/rooms/rooms.service';
import { AmenitiesService } from 'src/app/amenities/amenities.service';

@Component({
  selector: 'app-details-apartment',
  templateUrl: './details-apartment.component.html',
  styleUrls: ['./details-apartment.component.css']
})
export class DetailsApartmentComponent implements OnInit {
  apartment: ApartmentModel
  id: number;
  constructor(
    private apartmentsService: ApartmentsService,
    private roomsService: RoomsService,
    private amenitiesService: AmenitiesService,
    private route: ActivatedRoute,
    private modalService: ModalService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.fetchApartment(this.id);
    })
  }

  deleteRoom(id: number) {
    this.roomsService.deleteRoom(id).subscribe(() =>
      this.fetchApartment(this.id));
  }

  deleteAmenity(id: number) {
    this.amenitiesService.deleteAmenity(id, this.id).subscribe(() =>
      this.fetchApartment(this.id))
  }

  fetchApartment(id: number) {
    this.apartmentsService.getApartment(this.id).subscribe(res => {
      this.apartment = res;
      console.log(res)
    })
  }

  openModal(id: string) {
    this.modalService.open(id);
  }
}
