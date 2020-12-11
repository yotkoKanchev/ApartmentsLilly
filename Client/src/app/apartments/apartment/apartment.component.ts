import { Component, OnInit, Input } from '@angular/core';
import { ApartmentListingModel } from '../models/apartment-listing.model';

@Component({
  selector: 'app-apartment',
  templateUrl: './apartment.component.html',
  styleUrls: ['./apartment.component.css']
})
export class ApartmentComponent implements OnInit {
  @Input() ap: ApartmentListingModel;
  showMap: boolean;
  constructor() { }

  ngOnInit(): void {
    // this.ap.amenities.push("WiFi")
    // this.ap.amenities.push("AC")
    // this.ap.amenities.push("Washer")
    // for (let i = 0; i < this.ap.amenities.length-1; i++) {
    //   this.ap.amenities[i]+=' - ';
    // }
  }

  getMap() {
    if (this.showMap) {
      this.showMap = false
    } else {
      this.showMap = true;
    };
  }
}
