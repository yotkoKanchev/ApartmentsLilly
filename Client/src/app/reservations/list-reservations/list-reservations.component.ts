import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private router: Router,
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

  goToLink(route: string, id?: number) {
    if (id) {
      this.router.navigate([route, id]);
    } else {
      this.router.navigate([route]);
    }
  }
}
