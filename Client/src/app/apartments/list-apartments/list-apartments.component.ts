import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApartmentsService } from '../apartments.service';
import { ApartmentListingModel } from '../models/apartment-listing.model';

@Component({
  selector: 'app-list-apartments',
  templateUrl: './list-apartments.component.html',
  styleUrls: ['./list-apartments.component.css']
})
export class ListApartmentsComponent implements OnInit {
  apartments: Array<ApartmentListingModel>
  
  constructor(private apartmentService: ApartmentsService, private router: Router) { }

  ngOnInit(): void {
    this.fetchApartments();
  }
  
  fetchApartments() {
    this.apartmentService.getApartments()
    .subscribe(apartments => {
      this.apartments = apartments;
      })
  }

  editApartment(id: number) {
    console.log(`EDIT APARTMENT: ${id}`)
    this.router.navigate(["apartments","edit", id]);
  }

  deleteApartment(id: string) {
    this.apartmentService.deleteApartment(id).subscribe(() => {
      this.fetchApartments()
    })

  }
}