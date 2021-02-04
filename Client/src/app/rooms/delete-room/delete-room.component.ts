import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { RoomsService } from '../rooms.service';

@Component({
  selector: 'app-delete-room',
  templateUrl: './delete-room.component.html',
  styleUrls: ['./delete-room.component.css']
})
export class DeleteRoomComponent implements OnInit {
  @Input() id: number;
  constructor(
    private roomsService: RoomsService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
  }

  deleteRoom() {
    let id = this.roomsService.getRoomId();
    this.roomsService.deleteRoom(id).subscribe(() => {
      this.toastr.success("Room has been deleted.", "Success");
      setTimeout(() => {
        location.reload();
      }, 1000);
    });
  }
}
