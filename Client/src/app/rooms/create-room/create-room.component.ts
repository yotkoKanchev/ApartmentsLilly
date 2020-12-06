import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoomsService } from '../rooms.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ModalService } from '../../_modal';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.css']
})
export class CreateRoomComponent implements OnInit {
  roomForm: FormGroup;
  roomTypes: Array<string>;
  constructor(
    private modalService: ModalService,
    private fb: FormBuilder,
    private roomsService: RoomsService,
    private toastrService: ToastrService,
    private router: Router
  ) { 
    this.roomForm = this.fb.group({
      'Name': ['', [Validators.minLength(1), Validators.maxLength(30)]],
      'RoomType': ['', [Validators.minLength(2), Validators.maxLength(30)]],
    })
  }

  ngOnInit(): void {
    this.roomsService.getRoomTypes().subscribe(data => {
      console.log(data)
      this.roomTypes = data;
    })
  }

  create(){
    this.roomsService.create(this.roomForm.value)
      .subscribe(() => {
        this.toastrService.success("Success");
        this.router.navigate(["apartments"])
      })
  }

  get name() {
    return this.roomForm.get('Name');
  }

  get roomType() {
    return this.roomForm.get('RoomType');
  }
}
