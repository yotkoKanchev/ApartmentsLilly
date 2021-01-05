import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ReservationDetailsModel } from '../models/reservation-details.model';
import { ReservationsService } from '../reservations.service';

@Component({
  selector: 'app-details-reservation',
  templateUrl: './details-reservation.component.html',
  styleUrls: ['./details-reservation.component.css'],
})
export class DetailsReservationComponent implements OnInit {
  id: number;
  reservation: ReservationDetailsModel;
  bookInfo: string;

  constructor(
    private reservationsService: ReservationsService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
  ) {
    this.bookInfo = "By Pressing book button you confirm the reservation. You need to make full paiment not less than five days prior starting date. If you make payment even sooner you can alway cancel your reservation up to five days before start date."
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.fetchReservation(this.id);
    });
  }

  fetchReservation(id: number) {
    this.reservationsService.getReservation(id).subscribe(req => {
      this.reservation = req;
    })
  }

  cancelReservation(id: number) {
    this.reservationsService.cancelReservation(id).subscribe(() => {
      this.toastr.success("Success", "Reservation has been canceled.");
      this.router.navigate(['reservations/all'])
    })
  }
}
