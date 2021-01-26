import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ReservationDetailsModel } from '../models/reservation-details.model';
import { ReservationsService } from '../reservations.service';

@Component({
  selector: 'app-edit-reservation',
  templateUrl: './edit-reservation.component.html',
  styleUrls: ['./edit-reservation.component.css']
})
export class EditReservationComponent implements OnInit {
  id: number;
  reservation: ReservationDetailsModel;
  reservationForm: FormGroup;

  constructor(
    private reservationsService: ReservationsService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.reservationsService.get(this.id).subscribe(res => {
        this.reservation = res;
        this.reservationForm = this.fb.group({
          'id': [this.id],
          'confirmation': [this.reservation.confirmation],
          'firstName': [this.reservation.firstName],
          'lastName': [this.reservation.lastName],
          'email': [this.reservation.email],
          'phoneNumber': [this.reservation.phoneNumber],
          'additionalInfo': [this.reservation.addtionalInfo],
          'from': [this.reservation.from],
          'to': [this.reservation.to],
          'status': [this.reservation.status],
          'adults': [this.reservation.adults],
          'children': [this.reservation.children],
          'infants': [this.reservation.infants],
        });
      })
    })
  }

  editReservation() {
    this.reservationsService.edit(this.id, this.reservationForm.value).subscribe(() => {
      this.router.navigate(["reservations", this.id]);
      this.toastr.success("Reservations has been edited!", "Success")
    })
  }

}
