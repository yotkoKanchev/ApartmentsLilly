import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationsService } from './reservations.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from '../_modal';
import { CreateRequestComponent } from './create-request/create-request.component';
import { reservationComponents } from '.';

@NgModule({
  declarations: [
    ...reservationComponents,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ModalModule,
  ],
  providers: [
    ReservationsService,
  ],
  exports: [
    CreateRequestComponent,
  ]
})
export class ReservationsModule { }
