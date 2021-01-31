import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThankYouComponent } from './thank-you/thank-you.component';
import { contactsComponents } from '.';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { ContactsService } from './contacts.service';
import { ListContactFormMessagesComponent } from './list-contact-form-messages/list-contact-form-messages.component';

@NgModule({
  declarations: [
    ... contactsComponents,
    ListContactFormMessagesComponent],
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
