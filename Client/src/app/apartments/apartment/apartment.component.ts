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
  }

  getMap() {
    this.showMap = !this.showMap;
  }
}
