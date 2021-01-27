import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ReservationDetailsModel } from '../models/reservation-details.model';
import { ReservationsService } from '../reservations.service';
import { formatDate } from '@angular/common';
import { EnumerationModel } from 'src/app/shared/models/enumeration.model';

@Component({
  selector: 'app-edit-reservation',
  templateUrl: './edit-reservation.component.html',
  styleUrls: ['./edit-reservation.component.css']
})
export class EditReservationComponent implements OnInit {
 id: number;
  reservation: ReservationDetailsModel;
  reservationForm: FormGroup;
  reservationStatuses: EnumerationModel;

  constructor(
    private reservationsService: ReservationsService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
  ) {
    this.reservationForm = this.fb.group({
      'firstName': ['', [Validators.minLength(2), Validators.maxLength(20), Validators.required]],
      'lastName': ['', [Validators.minLength(2), Validators.maxLength(20), Validators.required]],
      'email': ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      'phoneNumber': ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      'additionalInfo': [''],
      'from': ['', Validators.required],
      'to': ['', Validators.required],
      'adults': ['', [Validators.min(1), Validators.max(3), Validators.required]],
      'children': ['', [Validators.min(0), Validators.max(2)]],
      'infants': ['', [Validators.min(0), Validators.max(2)]],
      'status': []
    },
      { validator: [this.dateLessThan('from', 'to'), this.datePassed('from')] }
    );
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.reservationsService.get(this.id).subscribe(res => {
      this.reservation = res;
      this.reservationForm = this.fb.group({
        'id': [this.id],
        'confirmation': [this.reservation.confirmation],
        'firstName': [this.reservation.firstName],
        'lastName': [this.reservation.lastName],
        'email': [this.reservation.email],
        'phoneNumber': [this.reservation.phoneNumber],
        'additionalInfo': [this.reservation.additionalInfo],
        'from': [formatDate(this.reservation.from, 'yyyy-MM-dd', 'en')],
        'to': [formatDate(this.reservation.to, 'yyyy-MM-dd', 'en')],
        'status': [this.reservation.status.value],
        'adults': [this.reservation.adults],
        'children': [this.reservation.children],
        'infants': [this.reservation.infants],
      });
    });

    this.reservationsService.getReservationStatuses().subscribe(data => {
      this.reservationStatuses = data;
    });
  }

  editReservation() {
    this.reservationsService.edit(this.id, this.reservationForm.value).subscribe(() => {
      this.router.navigate(["reservations", this.id]);
      this.toastr.success("Reservations has been edited!", "Success")
    })
  }

  dateLessThan(from: string, to: string) {
    return (group: FormGroup): { [key: string]: any } => {
      let f = group.controls[from];
      let t = group.controls[to];
      if (f.value > t.value) {
        return {
          dates: "Date from should be less than Date to"
        };
      }
      return {};
    }
  }

  datePassed(date: string) {
    return (group: FormGroup): { [key: string]: any } => {
      const currentDate = new Date(group.controls[date].value);
      const today = new Date();
      if (currentDate < today && currentDate.getDate < today.getDate) {
        return {
          dates: "Date can not be passed"
        };
      }
      return {};
    }
  }

  get startDate() {
    return this.reservationForm.get('from');
  }

  get endDate() {
    return this.reservationForm.get('to');
  }
}
