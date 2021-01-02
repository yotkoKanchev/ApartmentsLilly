import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoomsService } from '../rooms.service';
import { ToastrService } from 'ngx-toastr';
import { RoomModel } from '../models/room.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from 'src/app/_modal';
import { EnumerationModel } from 'src/app/shared/models/enumeration.model';

@Component({
  selector: 'app-edit-room',
  templateUrl: './edit-room.component.html',
  styleUrls: ['./edit-room.component.css']
})
export class EditRoomComponent implements OnInit {
  roomForm: FormGroup
  roomTypes: EnumerationModel;
  room: RoomModel;
  @Input()
  id: number;

  constructor(
    private fb: FormBuilder,
    private roomsService: RoomsService,
    private toastr: ToastrService,) {
    this.roomForm = this.fb.group({
      'id': [''],
      'name': ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
      'roomType': ['', Validators.required],
      'isSleepable': ['']
    })
  }

  ngOnInit(): void {
    this.roomsService.getRoom(this.id).subscribe(res => {
      this.room = res;
      this.roomForm = this.fb.group({
        'id': [this.room.id],
        'name': [this.room.name],
        'roomType': [this.room.roomType.value],
        'isSleepable': [this.room.isSleepable]
      });
    });

    this.roomsService.getRoomTypes().subscribe(data => {
      this.roomTypes = data;
    });
  }

  editRoom() {
    this.roomsService.edit(this.roomForm.value, this.id)
      .subscribe(() => {
        this.toastr.success("Room has been updated!", "Success");
        setTimeout(() => {
          location.reload();
        }, 1000);
      });
  }

  get name() {
    return this.roomForm.get('name');
  }

  get roomType() {
    return this.roomForm.get('roomType');
  }

  get isSleepable() {
    return this.roomForm.get('isSleepable');
  }
}
