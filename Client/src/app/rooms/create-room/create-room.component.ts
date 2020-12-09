import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoomsService } from '../rooms.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ModalService } from '../../_modal';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.css']
})
export class CreateRoomComponent implements OnInit {
  roomForm: FormGroup;
  roomTypes: Array<string>;
  @Input() apartmentId: string;
  constructor(
    private modalService: ModalService,
    private fb: FormBuilder,
    private roomsService: RoomsService,
    private toastrService: ToastrService,
    private router: Router,
    private _location: Location,
  ) { 
    this.roomForm = this.fb.group({
      'ApartmentId':[''],
      'Name': ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
      'RoomType': ['',Validators.required],
    })
  }

  ngOnInit(): void {
    this.roomsService.getRoomTypes().subscribe(data => {
      this.roomTypes = data;
    })
  }

  create(){
    this.roomsService.create(this.roomForm.value, this.apartmentId)
      .subscribe(() => {
        this.toastrService.success("Success");
      })
  }

  closeModal(id: string) {
    this.modalService.close(id);
    location.reload();
  }

  get name() {
    return this.roomForm.get('Name');
  }

  get roomType() {
    return this.roomForm.get('RoomType');
  }
}
