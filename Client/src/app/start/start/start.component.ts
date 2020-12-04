import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ApartmentsService } from 'src/app/apartments/apartments.service';
import { ApartmentListingModel } from 'src/app/apartments/models/apartment-listing.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {
  searchApartmentForm: FormGroup
  apartments: Array<ApartmentListingModel>
  nums: Array<number> = [0, 1, 2, 3];
  map: any;
  latitude: number = 42.136761;
  longitude: number = 24.7578769;
  fullAddress: string;
  showMap: boolean = false;
  constructor(private apartmentsService: ApartmentsService, private fb: FormBuilder, private sanitizer: DomSanitizer) {
    this.searchApartmentForm = this.fb.group({
      'Start-date': ['',],
      'End-date': ['',],
      'Adults': ['', [Validators.min(1), Validators.max(3), Validators.required]],
      'Children': ['', [Validators.min(0), Validators.max(2)]],
      'Infants': ['', [Validators.min(0), Validators.max(2)]]
    },
      { validator: [this.dateLessThan('Start-date', 'End-date'), this.datePassed('Start-date')] }
    );
  }

  ngOnInit(): void {

  }
  getMap() {
    if (this.showMap) {
      this.showMap = false
    } else {
      this.showMap = true;
    };
  }

  onSubmit() {
    this.apartmentsService.getApartments().subscribe(data => {
      this.apartments = data;
      this.fullAddress = this.sanitizer.bypassSecurityTrustResourceUrl(environment.googleMaps + '+' + this.apartments[0].addressCountry + '+' + this.apartments[0].addressCity + '+' + this.apartments[0].addressStreetAddress) as string;
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
}
