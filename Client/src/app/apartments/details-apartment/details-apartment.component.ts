import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApartmentsService } from '../apartments.service';
import { ApartmentModel } from '../models/apartment.model';
import { ModalService } from '../../_modal';
import { RoomsService } from 'src/app/rooms/rooms.service';
import { AmenitiesService } from 'src/app/amenities/amenities.service';
import { ToastrService } from 'ngx-toastr';

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
    private toastr: ToastrService,
    private modalService: ModalService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.fetchApartment(this.id);
    })
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  deleteRoom(id: number) {
    this.roomsService.deleteRoom(id).subscribe(() =>
      {
        this.toastr.success("Room has been deleted!", "Success");
        this.fetchApartment(this.id);
      });
  }

  deleteAmenity(amenityId: number) {
    this.amenitiesService.deleteAmenity(amenityId, this.id).subscribe(() =>
     {
      this.toastr.success("Amenity has been deleted!", "Success");
      this.fetchApartment(this.id);
     });
  }

  fetchApartment(id: number) {
    this.apartmentsService.getApartment(id).subscribe(res => {
      this.apartment = res;
    })
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  deleteBed(){
    console.log("yes")
  }
}
