import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApartmentsService } from '../apartments.service';
import { ApartmentModel } from '../models/apartment.model';
import { AmenitiesService } from 'src/app/amenities/amenities.service';
import { ToastrService } from 'ngx-toastr';
import { BedsService } from 'src/app/beds/beds.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { RoomsService } from 'src/app/rooms/rooms.service';

@Component({
  selector: 'app-details-apartment',
  templateUrl: './details-apartment.component.html',
  styleUrls: ['./details-apartment.component.css']
})
export class DetailsApartmentComponent implements OnInit {
  apartment: ApartmentModel
  id: number;
  childId: number;
  showMap: boolean;
  fullAddress: SafeResourceUrl;

  constructor(
    private apartmentsService: ApartmentsService,
    private roomsService: RoomsService,
    private amenitiesService: AmenitiesService,
    private bedsService: BedsService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private sanitizer: DomSanitizer,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.fetchApartment(this.id);
    })
  }

  deleteRoom(roomId: number) {
    this.roomsService.deleteRoom(roomId).subscribe(() => {
      this.toastr.success("Room has been deleted!", "Success");
      this.fetchApartment(this.id);
    });
  }

  deleteAmenity(amenityId: number, roomId) {
    this.amenitiesService.deleteAmenity(this.id, roomId, amenityId).subscribe(() => {
      this.toastr.success("Amenity has been deleted!", "Success");
      this.fetchApartment(this.id);
    });
  }

  deleteBed(bedId: number) {
    this.bedsService.deleteBed(bedId).subscribe(() => {
      this.toastr.success("Bed has been deleted!", "Success");
      this.fetchApartment(this.id);
    });
  }

  getMap() {
    this.showMap = !this.showMap;
  }

  setRoomId(id: number){
    this.roomsService.setRoomId(id);
  }

  private getMapDetails() {
    this.showMap = false;
    this.fullAddress = this.sanitizer.bypassSecurityTrustResourceUrl(
      environment.googleMaps + this.apartment.address.streetAddress + '+' + this.apartment.address.city + '+' + this.apartment.address.country);
  }

  private fetchApartment(id: number) {
    this.apartmentsService.getApartment(id).subscribe(res => {
      this.apartment = res;
      this.getMapDetails();
    })
  }
}
