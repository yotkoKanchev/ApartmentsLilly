import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { ApartmentsService } from '../apartments.service';
import { ApartmentListingModel } from '../models/apartment-listing.model';

@Component({
  selector: 'app-list-apartments',
  templateUrl: './list-apartments.component.html',
  styleUrls: ['./list-apartments.component.css']
})
export class ListApartmentsComponent implements OnInit {
  apartments: Array<ApartmentListingModel>

  constructor(
    private apartmentService: ApartmentsService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.fetchApartments();
  }

  fetchApartments() {
    this.apartmentService.getApartments()
      .subscribe(apartments => {
        this.apartments = apartments;
      })
  }

  isAdmin() {
    return this.authService.isAdmin();
  }
}