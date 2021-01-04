import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { apartmentComponents } from '.';
import { ApartmentsService } from './apartments.service';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { RoomsModule } from '../rooms/rooms.module';
import { ApartmentComponent } from './apartment/apartment.component';
import { AddressesModule } from '../addresses/addresses.module';
import { AmenitiesModule } from '../amenities/amenities.module';
import { BedsModule } from '../beds/beds.module';
import { GoogleMapComponent } from '../_googleMap/google-map/google-map.component';
import { ReservationsModule } from '../reservations/reservations.module';

@NgModule({
  declarations: [
    ...apartmentComponents,
    GoogleMapComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AppRoutingModule,
    RoomsModule,
    AddressesModule,
    AmenitiesModule,
    BedsModule,
    ReservationsModule,
  ],
  providers:[
    ApartmentsService,
  ],
  exports:[
    ApartmentComponent,
  ]
})
export class ApartmentsModule { }
