import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddressesService } from '../address.service';
import { AddressModel } from '../models/address.model';

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.css']
})
export class EditAddressComponent implements OnInit {
  addressForm: FormGroup;
  addressId: string;
  address: AddressModel;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private addressService: AddressesService,
    private router: Router) {
    this.addressForm = this.fb.group({
      'id': [''],
      'country': ['', [Validators.minLength(2), Validators.maxLength(30)]],
      'city': ['', [Validators.minLength(2), Validators.maxLength(30)]],
      'cityImageUrl': ['', Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')],
      'postalCode': ['', Validators.maxLength(10)],
      'neighborhood': ['', Validators.maxLength(30)],
      'streetAddress': ['', [Validators.minLength(2), Validators.maxLength(30)]],
    })
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.addressId = params['id'];
      this.addressService.getAddress(this.addressId).subscribe(res => {
        this.address = res;
        this.addressForm = this.fb.group({
          'id': [this.address.id],
          'country': [this.address.country],
          'city': [this.address.city],
          'cityImageUrl': [this.address.cityImageUrl],
          'postalCode': [this.address.postalCode],
          'neighborhood': [this.address.neighborhood],
          'streetAddress': [this.address.streetAddress],
        })
      })
    })
  }

  editAddress() {
    this.addressService.editAddress(this.addressForm.value).subscribe(() => {
      this.router.navigate(["addresses"])
    })
  }

  get country() {
    return this.addressForm.get('country');
  }

  get city() {
    return this.addressForm.get('city');
  }


  get cityImageUrl() {
    return this.addressForm.get('cityImageUrl');
  }

  get postalCode() {
    return this.addressForm.get('postalCode');
  }

  get neighborhood() {
    return this.addressForm.get('neighborhood');
  }

  get streetAddress() {
    return this.addressForm.get('streetAddress');
  }
}
