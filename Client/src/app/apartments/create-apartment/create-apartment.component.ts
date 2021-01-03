import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApartmentsService } from '../apartments.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-apartment',
  templateUrl: './create-apartment.component.html',
  styleUrls: ['./create-apartment.component.css']
})
export class CreateApartmentComponent {
  apartmentForm: FormGroup;
  addressId: number;

  constructor(
    private fb: FormBuilder,
    private apartmentService: ApartmentsService,
    private toastrService: ToastrService,
    private router: Router,
  ) {
    this.apartmentForm = this.fb.group({
      "Address": [Validators.required],
      'Name': ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      'Description': ['', [Validators.maxLength(1000)]],
      'MainImageUrl': ['', Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')],
      'Entry': ['', Validators.maxLength(10)],
      'Floor': ['', [Validators.min(-2), Validators.max(50), Validators.pattern('[0-9]')]],
      'Number': ['', [Validators.minLength(1), Validators.maxLength(10)]],
      'Size': ['', [Validators.min(0), Validators.max(1000)]],
      'BasePrice': ['', [Validators.min(0), Validators.max(10000)]],
      'MaxOccupants': ['', [Validators.required, Validators.min(1), Validators.max(100)]],
    })
  }

  create() {
    this.apartmentService.create(this.apartmentForm.value, this.addressId)
      .subscribe(data => {
        this.router.navigate([`apartments/${data['id']}`])
        this.toastrService.success("Apartment added.", "Success");
      });
  }

  getAddressId(data: number) {
    this.addressId = data;
  }

  get address() {
    return this.apartmentForm.get('Address');
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
}
