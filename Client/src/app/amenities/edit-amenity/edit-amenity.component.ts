import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AmenitiesService } from '../amenities.service';
import { ModalService } from 'src/app/_modal';
import { ToastrService } from 'ngx-toastr';
import { AmenityModel } from '../models/amenity.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-amenity',
  templateUrl: './edit-amenity.component.html',
  styleUrls: ['./edit-amenity.component.css']
})
export class EditAmenityComponent implements OnInit {
  amenityForm: FormGroup;
  importanceTypes: any;
  amenity: AmenityModel;
  id: number;
  apartmentId: number;

  constructor(
    private fb: FormBuilder,
    private amenitiesService: AmenitiesService,
    private modalService: ModalService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router, 
  ) {
    this.amenityForm = this.fb.group({
      'id': [''],
      'name': ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
      'importance': ['', Validators.required],
    })
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.apartmentId = params['apartmentId'];
    });

    this.amenitiesService.getAmenity(this.id, this.apartmentId).subscribe(res => {
      this.amenity = res;
      this.amenityForm = this.fb.group({
        'id': [this.amenity.id],
        'name': [this.amenity.name],
        'importance': [this.amenity.importance.value],
      });
    });

    this.amenitiesService.getImportanceTypes().subscribe(data => {
      this.importanceTypes = data;
    });
  }

  editAmenity() {
    this.amenitiesService.edit(this.amenityForm.value, this.id)
      .subscribe(() => {
        this.toastr.success("Amenity has been edited!", "Success")
        this.router.navigate([`apartments/${this.apartmentId}`]);
      });
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  get name() {
    return this.amenityForm.get('name');
  }

  get importance() {
    return this.amenityForm.get('importance');
  }
}
