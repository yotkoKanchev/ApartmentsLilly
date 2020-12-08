import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { apartmentComponents } from '.';
import { ApartmentsService } from './apartments.service';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { ModalModule } from './../_modal';
import { RoomsModule } from '../rooms/rooms.module';


@NgModule({
  declarations: [
    ...apartmentComponents,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ModalModule,
    RoomsModule,
  ],
  providers:[
    ApartmentsService
  ]
})
export class ApartmentsModule { }
