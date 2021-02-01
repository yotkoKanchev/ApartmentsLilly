import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../contacts.service';
import { ContactFormModel } from '../models/contact-form.model';

@Component({
  selector: 'app-list-contact-form-messages',
  templateUrl: './list-contact-form-messages.component.html',
  styleUrls: ['./list-contact-form-messages.component.css']
})
export class ListContactFormMessagesComponent implements OnInit {
  private messages: Array<ContactFormModel>;

  constructor(
    private contactsService: ContactsService,
  ) { }

  ngOnInit(): void {
    this.fetchMessages();
  }

  fetchMessages() {
    this.contactsService.getAll().subscribe(data => {
      this.messages = data
    })
  }
}
