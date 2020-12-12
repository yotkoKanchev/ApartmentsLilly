import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AmenitiesService } from '../amenities.service';
import { ModalService } from 'src/app/_modal';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AmenityModel } from '../models/amenity.model';

@Component({
  selector: 'app-edit-amenity',
  templateUrl: './edit-amenity.component.html',
  styleUrls: ['./edit-amenity.component.css']
})
export class EditAmenityComponent implements OnInit {
  @Input() amenityId: number;
  amenityForm: FormGroup;
  importanceTypes: any;
  amenity: AmenityModel;

  constructor(
    private fb: FormBuilder,
    private amenitiesService: AmenitiesService,
    private modalService: ModalService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.amenityForm = this.fb.group({
      'id': [''],
      'name': ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
      'importance': ['', Validators.required],
    })
   }

  ngOnInit(): void {
    this.amenitiesService.getImportanceTypes().subscribe(data => {
      this.importanceTypes = data;
    });

    this.amenitiesService.getAmenity(this.amenityId).subscribe(res => {
      this.amenity = res;
      this.amenityForm = this.fb.group({
        'name': [this.amenity.name],
        'importance': [this.amenity.importance],
      })
    })
  }

  editAmenity() {
    this.amenitiesService.edit(this.amenityForm.value, this.amenityId)
      .subscribe(() => {
        this.toastr.success("Amenity has been edited!", "Success")
      });
    location.reload();
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  get name() {
    return this.amenityForm.get('name');
  }

  get importance(){
    return this.amenityForm.get('importance');
  }
}
