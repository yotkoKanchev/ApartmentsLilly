import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddressesService } from '../addresses.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-address',
  templateUrl: './create-address.component.html',
  styleUrls: ['./create-address.component.css']
})
export class CreateAddressComponent {
  addressForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private addressService: AddressesService,
    private toastrService: ToastrService,
    private modalService: NgbModal,
  ) {
    this.addressForm = this.fb.group({
      'Country': ['', [Validators.minLength(2), Validators.maxLength(30)]],
      'City': ['', [Validators.minLength(2), Validators.maxLength(30)]],
      'PostalCode': ['', Validators.maxLength(10)],
      'Neighborhood': ['', Validators.maxLength(30)],
      'StreetAddress': ['', [Validators.minLength(2), Validators.maxLength(30)]],
    })
  }

  create() {
    this.addressService.create(this.addressForm.value)
      .subscribe(() => {
        this.toastrService.success("Success", "Address has been created.");
        location.reload();
      })
  }

  closeModal() {
    this.modalService.dismissAll();
  }

  get country() {
    return this.addressForm.get('Country');
  }

  get city() {
    return this.addressForm.get('City');
  }

  get postalCode() {
    return this.addressForm.get('PostalCode');
  }

  get neighborhood() {
    return this.addressForm.get('Neighborhood');
  }

  get streetAddress() {
    return this.addressForm.get('StreetAddress');
  }
}
