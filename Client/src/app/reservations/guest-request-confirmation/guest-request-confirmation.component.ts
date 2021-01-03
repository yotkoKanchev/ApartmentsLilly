import { Component, OnInit } from '@angular/core';
import { ConfirmationModel } from '../models/confirmation.model';
import { ReservationsService } from '../reservations.service';

@Component({
  selector: 'app-guest-request-confirmation',
  templateUrl: './guest-request-confirmation.component.html',
  styleUrls: ['./guest-request-confirmation.component.css']
})
export class GuestRequestConfirmationComponent implements OnInit {
  confirmationDetails: ConfirmationModel;

  constructor(
    private reservationService: ReservationsService,
  ) { }

  ngOnInit(): void {
    this.confirmationDetails = this.reservationService.getConfirmationDetails();
  }
}
