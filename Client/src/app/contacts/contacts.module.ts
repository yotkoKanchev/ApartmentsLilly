import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { contactsComponents } from '.';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { ContactsService } from './contacts.service';

@NgModule({
  declarations: [
    ...contactsComponents,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [
    ContactsService,
  ]
})
export class ContactsModule { }
