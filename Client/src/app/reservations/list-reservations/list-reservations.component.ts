import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReservationListingModel } from '../models/reservation-listing.model';
import { ReservationsService } from '../reservations.service';

@Component({
  selector: 'app-list-reservations',
  templateUrl: './list-reservations.component.html',
  styleUrls: ['./list-reservations.component.css']
})
export class ListReservationsComponent implements OnInit {
  reservations: Array<ReservationListingModel>

  constructor(
    private reservationsService: ReservationsService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.fetchReservations(params.status);
    });
  }

  fetchReservations(status?: string) {
    this.reservationsService.getAll(status).subscribe(data => {
      this.reservations = data;
    })
  }
}
