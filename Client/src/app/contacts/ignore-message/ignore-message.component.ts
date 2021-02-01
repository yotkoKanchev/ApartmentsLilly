import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'app-ignore-message',
  templateUrl: './ignore-message.component.html',
  styleUrls: ['./ignore-message.component.css']
})
export class IgnoreMessageComponent {
  @Input() id: number;
  constructor(
    private contactsService: ContactsService,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  ignore() {
    this.contactsService.ignore(this.id);
    this.toastr.success("Message has been ignored.", "Success");
    this.router.navigate(["administration/messages"])
  }
}
