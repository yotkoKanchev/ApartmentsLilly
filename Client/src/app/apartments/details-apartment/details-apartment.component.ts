import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApartmentsService } from '../apartments.service';
import { ApartmentModel } from '../models/apartment.model';
import { ModalService } from '../../_modal';
import { apartmentComponents } from '..';
import { RoomsService } from 'src/app/rooms/rooms.service';

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
    private route: ActivatedRoute, 
    private modalService: ModalService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.apartmentsService.getApartment(this.id).subscribe(res => {
        this.apartment = res;
      })
    })
  }

  deleteRoom(id: number){
    console.log("from Details Component")
    this.roomsService.deleteRoom(id);
  }

  openModal(id: string) {
    this.modalService.open(id);
  }
}
