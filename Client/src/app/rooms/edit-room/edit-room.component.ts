import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RoomsService } from '../rooms.service';
import { ToastrService } from 'ngx-toastr';
import { RoomModel } from '../models/room.model';
import { ModalService } from 'src/app/_modal';

@Component({
  selector: 'app-edit-room',
  templateUrl: './edit-room.component.html',
  styleUrls: ['./edit-room.component.css']
})
export class EditRoomComponent implements OnInit {
  roomForm: FormGroup
  @Input() roomId: number;
  roomTypes: Array<string>;
  room: RoomModel;
  constructor(
    private fb: FormBuilder,
    private roomsService: RoomsService,
    private modalService: ModalService,
    private toastr: ToastrService,
    private router: Router) {
    this.roomForm = this.fb.group({
      'id': [''],
      'name': ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
      'roomType': ['', Validators.required],
    })
  }

  ngOnInit(): void {
    this.roomsService.getRoomTypes().subscribe(data => {
      this.roomTypes = data;
    });

    this.roomsService.getRoom(this.roomId).subscribe(res => {
      this.room = res;
      this.roomForm = this.fb.group({
        'name': [this.room.name],
        'roomType': [this.room.roomType],
      })
    })
  }

  editRoom() {
    this.roomsService.edit(this.roomForm.value, this.roomId)
      .subscribe(() => {
        this.toastr.success("Room has been edited!", "Success")
      });
    location.reload();
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  get name() {
    return this.roomForm.get('name');
  }

  get roomType() {
    return this.roomForm.get('roomType');
  }

}