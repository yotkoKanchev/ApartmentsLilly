import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoomsService } from '../rooms.service';
import { ToastrService } from 'ngx-toastr';
import { RoomModel } from '../models/room.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from 'src/app/_modal';

@Component({
  selector: 'app-edit-room',
  templateUrl: './edit-room.component.html',
  styleUrls: ['./edit-room.component.css']
})
export class EditRoomComponent implements OnInit {
  roomForm: FormGroup
  roomTypes: any;
  room: RoomModel;
  id: number;
  apartmentId: number;
  roomIsSleepable: boolean;

  constructor(
    private fb: FormBuilder,
    private modal: ModalService,
    private roomsService: RoomsService,
    private route: ActivatedRoute,
    private router: Router, 
    private toastr: ToastrService,) {
    this.roomForm = this.fb.group({
      'id': [''],
      'name': ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
      'roomType': ['', Validators.required],
      'isSleepable': ['']
    })
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.roomsService.getRoom(this.id).subscribe(res => {
      this.room = res;
      this.roomIsSleepable = res.isSleepable;
      this.apartmentId = this.room.apartmentId;
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
        this.router.navigate([`apartments/${this.apartmentId}`]);
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
