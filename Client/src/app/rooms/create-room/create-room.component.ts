import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoomsService } from '../rooms.service';
import { ToastrService } from 'ngx-toastr';
import { ModalService } from 'src/app/_modal';
import { Router } from '@angular/router';
import { ApartmentsService } from 'src/app/apartments/apartments.service';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.css']
})
export class CreateRoomComponent implements OnInit {
  roomForm: FormGroup;
  roomTypes: any;
  @Input()
  apartmentId: number;

  constructor(
    private modalService: ModalService,
    private fb: FormBuilder,
    private roomsService: RoomsService,
    private toastrService: ToastrService,
    private apartmentsService: ApartmentsService,
    private router: Router,
  ) {
    this.roomForm = this.fb.group({
      'ApartmentId': [],
      'Name': ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
      'RoomType': ['', Validators.required],
      'IsSleepable': [false],
    })
  }

  ngOnInit(): void {
    this.roomsService.getRoomTypes().subscribe(data => {
      this.roomTypes = data;
    })
  }

  create(id: string) {
    this.roomsService.create(this.roomForm.value, this.apartmentId)
      .subscribe(() => {
        this.toastrService.success("Room added", "Success");
        this.closeModal(id);
        setTimeout(() => {
          location.reload();
        }, 3000);
      })
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  get name() {
    return this.roomForm.get('Name');
  }

  get roomType() {
    return this.roomForm.get('RoomType');
  }

  get isSleepable() {
    return this.roomForm.get('IsSleepable');
  }
}
