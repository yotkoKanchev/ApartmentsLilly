import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationsService } from './reservations.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateReservationComponent } from './create-reservation/create-reservation.component';
import { reservationComponents } from '.';
import { AppRoutingModule } from '../app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    ...reservationComponents,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgbModule,
  ],
  providers: [
    ReservationsService,
  ],
  exports: [
    CreateReservationComponent,
  ]
})
export class ReservationsModule { }
