import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApartmentsService } from '../apartments.service';
import { ToastrService } from 'ngx-toastr';
import { AddressModel } from 'src/app/addresses/models/address.model';
import { AddressesService } from 'src/app/addresses/address.service';
import { ModalService } from '../../_modal';

@Component({
  selector: 'app-create-apartment',
  templateUrl: './create-apartment.component.html',
  styleUrls: ['./create-apartment.component.css']
})
export class CreateApartmentComponent implements OnInit {
  apartmentForm: FormGroup;
  addresses: Array<AddressModel>
  bodyText: string;

  constructor(
    private modalService: ModalService,
    private fb: FormBuilder,
    private apartmentService: ApartmentsService,
    private toastrService: ToastrService,
    private router: Router,
    private addressesService: AddressesService) {
    this.apartmentForm = this.fb.group({
      'AddressId': ['', Validators.required],
      'Name': ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      'Description': ['', [Validators.maxLength(1000)]],
      'MainImageUrl': ['', Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')],
      'Entry': ['', Validators.maxLength(10)],
      'Floor': ['', [Validators.min(-2), Validators.max(50), Validators.pattern('[0-9]')]],
      'Number': ['', [Validators.minLength(1), Validators.maxLength(10)]],
      'Size': ['', [Validators.min(0), Validators.max(1000)]],
      'BasePrice': ['', [Validators.min(0), Validators.max(10000)]],
      'MaxOccupants': ['', [Validators.required, Validators.min(1), Validators.max(100)]],
      'HasTerrace': ['',],
    })
  }

  ngOnInit(): void {
    this.bodyText = 'This text can be updated in modal 1';
    this.addressesService.getAddresses().subscribe(data => {
      this.addresses = data;
    });
  }

  create() {
    this.apartmentService.create(this.apartmentForm.value)
      .subscribe(data => {
        this.toastrService.success("Success");
        this.router.navigate([`apartments/${data['id']}`])
      });
  }

  onOptionsSelected(value: string) {
    if (value == "addAddress") {
      this.openModal('add-address-modal');
    }
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  get name() {
    return this.apartmentForm.get('Name');
  }

  get description() {
    return this.apartmentForm.get('Description');
  }

  get mainImageUrl() {
    return this.apartmentForm.get('MainImageUrl');
  }

  get entry() {
    return this.apartmentForm.get('Entry');
  }

  get floor() {
    return this.apartmentForm.get('Floor');
  }

  get number() {
    return this.apartmentForm.get('Number');
  }

  get size() {
    return this.apartmentForm.get('Size');
  }
  get basePrice() {
    return this.apartmentForm.get('BasePrice');
  }
  get maxOccupants() {
    return this.apartmentForm.get('MaxOccupants');
  }
  get hasTerrace() {
    return this.apartmentForm.get('HasTerrace');
  }

  get addressId() {
    return this.apartmentForm.get("AddressId");
  }

}
