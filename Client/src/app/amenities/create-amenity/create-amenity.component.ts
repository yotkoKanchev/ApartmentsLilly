import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AmenitiesService } from '../amenities.service';
import { ToastrService } from 'ngx-toastr';
import { ModalService } from '../../_modal';
import { Router } from '@angular/router';

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

  create(id: string) {
    this.amenitiesService.create(this.amenityForm.value, this.apartmentId)
      .subscribe(() => {
        this.toastrService.success("Amenity added", "Success");
        this.closeModal(id);
        setTimeout(() => {
        location.reload();
        }, 2000);
      })
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
