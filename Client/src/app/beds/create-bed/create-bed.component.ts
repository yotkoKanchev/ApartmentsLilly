import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RoomListingModel } from 'src/app/rooms/models/room-listing.model';
import { BedsService } from '../beds.service';

@Component({
  selector: 'app-create-bed',
  templateUrl: './create-bed.component.html',
  styleUrls: ['./create-bed.component.css']
})
export class CreateBedComponent implements OnInit {
  bedForm: FormGroup;
  bedTypes: any;
  @Input() rooms: Array<RoomListingModel>

  constructor(
    private fb: FormBuilder,
    private bedsService: BedsService,
    private toastrService: ToastrService,
  ) {
    this.bedForm = this.fb.group({
      'RoomId': ['', Validators.required],
      'BedType': ['', Validators.required],
    })
  }

  ngOnInit(): void {
    this.bedsService.getBedTypes().subscribe(data => {
      this.bedTypes = data;
    })

    this.rooms = this.rooms.filter(r => r.isSleepable)
  }

  create() {
    this.bedsService.create(this.bedForm.value)
      .subscribe(() => {
        this.toastrService.success("Bed added", "Success");
        setTimeout(() => {
          location.reload();
        }, 1000);
      })
  }

  get room() {
    return this.bedForm.get('RoomId');
  }

  get bedType() {
    return this.bedForm.get('BedType');
  }
}
