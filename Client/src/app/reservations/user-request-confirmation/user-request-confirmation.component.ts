import { Component, OnInit } from '@angular/core';
import { ReservationsService } from '../reservations.service';

@Component({
  selector: 'app-user-request-confirmation',
  templateUrl: './user-request-confirmation.component.html',
  styleUrls: ['./user-request-confirmation.component.css']
})
export class UserRequestConfirmationComponent implements OnInit {
  confirmation: string;

  constructor(
    private reservationService: ReservationsService,
  ) { }

  ngOnInit(): void {
    this.confirmation = this.reservationService.getConfirmationDetails()['confirmation'];
  }
}
