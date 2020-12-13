import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AmenitiesService } from '../amenities.service';
import { ToastrService } from 'ngx-toastr';
import { ModalService } from '../../_modal';

@Component({
  selector: 'app-create-amenity',
  templateUrl: './create-amenity.component.html',
  styleUrls: ['./create-amenity.component.css']
})
export class CreateAmenityComponent implements OnInit {
  amenityForm: FormGroup;
  @Input() 
  apartmentId: number;
  importanceTypes: any;

  constructor(
    private modalService: ModalService,
    private fb: FormBuilder,
    private amenitiesService: AmenitiesService,
    private toastrService: ToastrService,
    private router: Router,
  ) {
    this.amenityForm = this.fb.group({
      'Name': ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      'Importance': ['', Validators.required],
    })
  }

  ngOnInit(): void {
    this.amenitiesService.getImportanceTypes().subscribe(data => {
      this.importanceTypes = data;
    })
  }

  create() {
    console.log(this.amenityForm.value, this.apartmentId)
    this.amenitiesService.create(this.amenityForm.value, this.apartmentId)
      .subscribe(() => {
        this.toastrService.success("Amenity added", "Success");
      })
    location.reload();
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  get name() {
    return this.amenityForm.get('Name');
  }

  get importance() {
    return this.amenityForm.get('Importance');
  }
}
