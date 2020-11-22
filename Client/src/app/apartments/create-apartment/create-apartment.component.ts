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
  constructor(
    private fb: FormBuilder,
    private addressService: ApartmentsService,
    private toastrService: ToastrService,
    private router: Router) {
    this.apartmentForm = this.fb.group({
      'Name': ['', [Validators.minLength(2), Validators.maxLength(30)]],
      'Description': ['', [Validators.maxLength(1000)]],
      'MainImageUrl': ['', Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')],
      'Entry': ['', Validators.maxLength(10)],
      'Floor': ['', [Validators.min(-2), Validators.max(50)]],
      'Number': ['', [Validators.minLength(1), Validators.maxLength(20)]],
      'Size': ['', [Validators.min(0), Validators.max(1000)]],
      'BasePrice': ['', [Validators.min(0), Validators.max(10000)]],
      'MaxOccupants': ['', [Validators.min(0), Validators.max(1000)]],
      'HasTerrace': ['', ],
    })
  }

  create(){

  }

}
