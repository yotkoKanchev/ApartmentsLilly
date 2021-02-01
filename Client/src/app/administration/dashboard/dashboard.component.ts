import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfilesService } from 'src/app/profiles/profiles.service';
import { ReservationListingModel } from 'src/app/reservations/models/reservation-listing.model';
import { ReservationsService } from 'src/app/reservations/reservations.service';
import { EnumerationModel } from 'src/app/shared/models/enumeration.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  reservations: Array<ReservationListingModel>;
  newReservations: Array<ReservationListingModel>;
  reservationsStatuses: EnumerationModel;

  constructor(
    private profilesService: ProfilesService,
    private reservationsService: ReservationsService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.fetchReservations();
  }

  fetchReservations() {
    this.reservationsService.getAll().subscribe(data => {
      this.reservations = data;
      this.newReservations = this.reservations.filter(r => r.status == "Requested")
    });

    this.reservationsService.getStatuses().subscribe(data => {
      this.reservationsStatuses = data;
    });
  }
}