import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { ModalModule } from './../_modal';
import { addressComponents } from '.';
import { AddressesService } from './addresses.service';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ChooseAddressComponent } from './choose-address/choose-address.component';

@NgModule({
  declarations: [
    ...addressComponents,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    ModalModule,
  ],
  providers:[
    AddressesService,
  ],
  exports: [
    ChooseAddressComponent,
  ]

})
export class AddressesModule { }
