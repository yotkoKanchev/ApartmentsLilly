import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddressesService } from '../addresses.service';
import { AddressModel } from '../models/address.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.css']
})
export class EditAddressComponent implements OnInit {
  @Input() addressId: string;
  @Input() apartmentId: number;
  addressForm: FormGroup;
  address: AddressModel;

  constructor(
    private fb: FormBuilder,
    private addressService: AddressesService,
    private toastr: ToastrService,
  ) {
    this.addressForm = this.fb.group({
      'country': ['', [Validators.minLength(2), Validators.maxLength(30)]],
      'city': ['', [Validators.minLength(2), Validators.maxLength(30)]],
      'postalCode': ['', Validators.maxLength(10)],
      'neighborhood': ['', Validators.maxLength(30)],
      'streetAddress': ['', [Validators.minLength(2), Validators.maxLength(30)]],
    })
  }

  ngOnInit() {
    this.addressService.getAddress(this.addressId).subscribe(res => {
      this.address = res;
      this.addressForm = this.fb.group({
        'country': [this.address.country],
        'city': [this.address.city],
        'postalCode': [this.address.postalCode],
        'neighborhood': [this.address.neighborhood],
        'streetAddress': [this.address.streetAddress],
      })
    })
  }

  editAddress() {
    this.addressService.editAddress(this.addressForm.value, this.addressId).subscribe(() => {
      this.toastr.success("Address has been edited!", "Success")
      setTimeout(() => {
        location.reload();
      }, 1000);
    })
  }

  get country() {
    return this.addressForm.get('country');
  }

  get city() {
    return this.addressForm.get('city');
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
