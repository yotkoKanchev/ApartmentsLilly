import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { apartmentComponents } from '.';
import { ApartmentsService } from './apartments.service';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { ModalModule } from './../_modal';
import { RoomsModule } from '../rooms/rooms.module';
import { ApartmentComponent } from './apartment/apartment.component';
import { AddressesModule } from '../addresses/addresses.module';
import { AmenitiesModule } from '../amenities/amenities.module';

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
    AddressesModule,
    AmenitiesModule,
  ],
  providers:[
    ApartmentsService,
  ],
  exports:[
    ApartmentComponent
  ]
})
export class ApartmentsModule { }
