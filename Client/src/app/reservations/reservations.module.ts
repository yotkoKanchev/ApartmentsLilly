import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationsService } from './reservations.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateRequestComponent } from './create-request/create-request.component';
import { reservationComponents } from '.';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [
    ...reservationComponents,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [
    ReservationsService,
  ],
  exports: [
    CreateRequestComponent,
  ]
})
export class ReservationsModule { }
