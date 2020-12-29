import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationModel } from '../models/confirmation.model';
import { ReservationsService } from '../reservations.service';

@Component({
  selector: 'app-user-request-confirmation',
  templateUrl: './user-request-confirmation.component.html',
  styleUrls: ['./user-request-confirmation.component.css']
})
export class UserRequestConfirmationComponent implements OnInit {
  confirmation: string;
  constructor(private route: ActivatedRoute, private reservationService: ReservationsService) { }

  ngOnInit(): void {
      this.confirmation = this.reservationService.getConfirmationDetails()['confirmation'];
  }
}
