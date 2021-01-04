import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { addressComponents } from '.';
import { AddressesService } from './addresses.service';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ChooseAddressComponent } from './choose-address/choose-address.component';
import { EditAddressComponent } from './edit-address/edit-address.component';
import { CreateAddressComponent } from './create-address/create-address.component';

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
  ],
  providers:[
    AddressesService,
  ],
  exports: [
    ChooseAddressComponent,
    EditAddressComponent,
    CreateAddressComponent,
  ]

})
export class AddressesModule { }
