import { Component, OnInit } from '@angular/core';
import { ReservationsService } from '../reservations.service';

@Component({
  selector: 'app-user-reservation-confirmation',
  templateUrl: './user-reservation-confirmation.component.html',
  styleUrls: ['./user-reservation-confirmation.component.css']
})
export class UserReservationConfirmationComponent implements OnInit {
  confirmation: string;

  constructor(
    private reservationService: ReservationsService,
  ) { }

  ngOnInit(): void {
    this.confirmation = this.reservationService.getConfirmationDetails()['confirmation'];
  }
}
