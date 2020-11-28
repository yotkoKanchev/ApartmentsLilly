import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApartmentsService } from 'src/app/apartments/apartments.service';
import { ApartmentListingModel } from 'src/app/apartments/models/apartment-listing.model';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {
  searchApartmentForm: FormGroup
  apartments: Array<ApartmentListingModel>
  minDate = new Date();
  maxDate = new Date(this.minDate.getMonth() + 6)
  constructor(private apartmentsService: ApartmentsService, private fb: FormBuilder) {
    this.searchApartmentForm = this.fb.group({
      'Start-date': ['',],
      'End-date': ['',],
      'Adults': ['', [Validators.min(1), Validators.max(3)]],
      'Children': ['', [Validators.min(0), Validators.max(2)]],
      'Infants': [',', [Validators.min(0), Validators.max(2)]]
    },
      { validator: [this.dateLessThan('Start-date', 'End-date'), this.datePassed('Start-date')] }
     );
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.apartmentsService.getApartments().subscribe(data => {
      this.apartments = data;
    })
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
      let t = group.controls[date];
      if (new Date(t.value) < new Date()) {
        return {
          dates: "Date can not be passed"
        };
      }
      return {};
    }
  }
}
