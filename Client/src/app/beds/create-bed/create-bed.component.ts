import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ModalService } from 'src/app/_modal';
import { BedsService } from '../beds.service';

@Component({
  selector: 'app-create-bed',
  templateUrl: './create-bed.component.html',
  styleUrls: ['./create-bed.component.css']
})
export class CreateBedComponent implements OnInit {
  bedForm: FormGroup;
  bedTypes: any;
  @Input()
  roomId: number;

  constructor(
    private modalService: ModalService,
    private fb: FormBuilder,
    private bedsService: BedsService,
    private toastrService: ToastrService,
  ) {
    this.bedForm = this.fb.group({
      'BedType': ['', Validators.required],
    })
  }

  ngOnInit(): void {
    this.bedsService.getBedTypes().subscribe(data => {
      this.bedTypes = data;
    })
  }

  create(id: string) {
    this.bedsService.create(this.bedForm.value, this.roomId)
      .subscribe(() => {
        this.toastrService.success("Bed added", "Success");
        this.closeModal(id);
        setTimeout(() => {
          location.reload();
        }, 2000);
      })
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  get bedType() {
    return this.bedForm.get('BedType');
  }
}
