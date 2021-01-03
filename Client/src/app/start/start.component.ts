import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ApartmentsService } from 'src/app/apartments/apartments.service';
import { environment } from 'src/environments/environment';
import { ApartmentListingModel } from '../apartments/models/apartment-listing.model';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent {
  searchApartmentForm: FormGroup
  apartments: Array<ApartmentListingModel>
  nums: Array<number> = [0, 1, 2, 3];

  constructor(
    private apartmentsService: ApartmentsService,
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
  ) {
    this.searchApartmentForm = this.fb.group({
      'startDate': ['', Validators.required],
      'endDate': ['', Validators.required],
      'adults': ['', [Validators.min(1), Validators.max(3), Validators.required]],
      'children': ['', [Validators.min(0), Validators.max(2)]],
      'infants': ['', [Validators.min(0), Validators.max(2)]]
    },
      { validator: [this.dateLessThan('startDate', 'endDate'), this.datePassed('startDate')] }
    );
  }

  onSubmit() {
    this.apartmentsService.getAvailableApartments(this.searchApartmentForm.value).subscribe(data => {
      this.apartments = data;
      console.log(this.apartments)
      for (const apart of this.apartments) {
        apart.fullAddress = this.sanitizer.bypassSecurityTrustResourceUrl(
          environment.googleMaps + apart.addressStreetAddress + '+' + apart.addressCity + '+' + apart.addressCountry);
      };
    });
  }

  dateLessThan(from: string, to: string) {
    return (group: FormGroup): { [key: string]: any } => {
      let f = group.controls[from];
      let t = group.controls[to];
      if (f.value > t.value) {
        return {
          dates: "Date from should be less than Date to"
        };
      }
      return {};
    }
  }

  datePassed(date: string) {
    return (group: FormGroup): { [key: string]: any } => {
      const currentDate = new Date(group.controls[date].value);
      const today = new Date();
      if (currentDate < today && currentDate.getDate < today.getDate) {
        return {
          dates: "Date can not be passed"
        };
      }
      return {};
    }
  }

  get startDate() {
    return this.searchApartmentForm.get('startDate');
  }

  get endDate() {
    return this.searchApartmentForm.get('endDate');
  }
}