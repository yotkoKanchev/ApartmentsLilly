import { Component, OnInit } from '@angular/core';
import { ReservationConfirmationModel } from '../models/reservation-confirmation.model';
import { ReservationsService } from '../reservations.service';

@Component({
  selector: 'app-guest-reservation-confirmation',
  templateUrl: './guest-reservation-confirmation.component.html',
  styleUrls: ['./guest-reservation-confirmation.component.css']
})
export class GuestReservationConfirmationComponent implements OnInit {
  confirmationDetails: ReservationConfirmationModel;

  constructor(
    private reservationService: ReservationsService,
  ) { }

  ngOnInit(): void {
    this.confirmationDetails = this.reservationService.getConfirmationDetails();
  }
}
