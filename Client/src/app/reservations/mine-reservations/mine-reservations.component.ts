import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ReservationListingModel } from '../models/reservation-listing.model';
import { ReservationsService } from '../reservations.service';

@Component({
  selector: 'app-mine-reservations',
  templateUrl: './mine-reservations.component.html',
  styleUrls: ['./mine-reservations.component.css']
})
export class MineReservationsComponent implements OnInit {
  reservations: Array<ReservationListingModel>
  constructor(
    private reservationsService: ReservationsService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.fetchReservations();
  }

  cancelReservation(id: number) {
    this.reservationsService.cancel(id).subscribe(() => {
      this.toastr.success("Success", "Reservation has been canceled.");
      setTimeout(() => {
        location.reload()
      }, 1000);
    })
  }

  fetchReservations() {
    this.reservationsService.getMine().subscribe(data => {
      this.reservations = data;
    })
  }
}
