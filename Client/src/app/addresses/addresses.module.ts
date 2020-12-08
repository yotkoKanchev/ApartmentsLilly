import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { ModalModule } from './../_modal';
import { addressComponents } from '.';
import { AddressesService } from './address.service';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateAddressComponent } from './create-address/create-address.component';

@NgModule({
  declarations: [
    ...addressComponents,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ModalModule,
    BrowserModule,
    BrowserAnimationsModule,
  ],
  providers:[
    AddressesService
  ],
  exports: [
    CreateAddressComponent
  ]

})
export class AddressesModule { }
