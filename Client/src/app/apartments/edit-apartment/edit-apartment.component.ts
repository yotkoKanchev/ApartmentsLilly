import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApartmentsService } from '../apartments.service';
import { ApartmentModel } from '../models/apartment.model';

@Component({
  selector: 'app-edit-apartment',
  templateUrl: './edit-apartment.component.html',
  styleUrls: ['./edit-apartment.component.css']
})
export class EditApartmentComponent implements OnInit {
  apartmentForm: FormGroup;
  apartmentId: number;
  apartment: ApartmentModel;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private apartmentsService: ApartmentsService,
    private router: Router) {
    this.apartmentForm = this.fb.group({
      'id': [''],
      'name': ['', [Validators.minLength(2), Validators.maxLength(30)]],
      'description': ['', [Validators.maxLength(1000)]],
      'mainImageUrl': ['', Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')],
      'entry': ['', Validators.maxLength(10)],
      'floor': ['', [Validators.min(-2), Validators.max(50)]],
      'number': ['', [Validators.minLength(1), Validators.maxLength(20)]],
      'size': ['', [Validators.min(0), Validators.max(1000)]],
      'basePrice': ['', [Validators.min(0), Validators.max(10000)]],
      'maxOccupants': ['', [Validators.min(0), Validators.max(1000)]],
      'hasTerrace': ['',],
    })
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.apartmentId = params['id'];
      this.apartmentsService.getApartment(this.apartmentId).subscribe(res => {
        this.apartment = res;
        this.apartmentForm = this.fb.group({
          'id': [this.apartment.id],
          'name': [this.apartment.name],
          'description': [this.apartment.description],
          'mainImageUrl': [this.apartment.mainImageUrl],
          'entry': [this.apartment.entry],
          'floor': [this.apartment.floor],
          'number': [this.apartment.number],
          'size': [this.apartment.size],
          'basePrice': [this.apartment.basePrice],
          'maxOccupants': [this.apartment.maxOccupants],
          'hasTerrace': [this.apartment.hasTerrace],
        })
      })
    })
  }

  editAddress() {
    this.apartmentsService.editApartment(this.apartmentForm.value).subscribe(() => {
      this.router.navigate(["apartments"])
    })
  }

  get name() {
    return this.apartmentForm.get('name');
  }

  // get city() {
  //   return this.addressForm.get('city');
  // }


  // get cityImageUrl() {
  //   return this.addressForm.get('cityImageUrl');
  // }

  // get postalCode() {
  //   return this.addressForm.get('postalCode');
  // }

  // get neighborhood() {
  //   return this.addressForm.get('neighborhood');
  // }

  // get streetAddress() {
  //   return this.addressForm.get('streetAddress');
  // }
}
