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
  idType:string;
  @Input()
  parentId:number;

  constructor(
    private modalService: ModalService,
    private fb: FormBuilder,
    private amenitiesService: AmenitiesService,
    private toastrService: ToastrService,
    private router: Router,) {
    this.amenityForm = this.fb.group({
      'Name': ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
    })
  }

  ngOnInit(): void {
  }

  create(){
    console.log(this.amenityForm.value)
    console.log(this.idType)
    console.log(this.parentId)
    this.amenitiesService.create(this.amenityForm.value, this.idType, this.parentId)
      .subscribe(() => {
        this.toastrService.success("Amenity added", "Success");
      })
    // location.reload();
  }

  closeModal(id:string){
    this.modalService.close(id);
  }

  get name() {
    return this.amenityForm.get('Name');
  }
}
