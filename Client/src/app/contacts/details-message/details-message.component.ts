import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ContactsService } from '../contacts.service';
import { ContactFormModel } from '../models/contact-form.model';

@Component({
  selector: 'app-details-message',
  templateUrl: './details-message.component.html',
  styleUrls: ['./details-message.component.css']
})
export class DetailsMessageComponent implements OnInit {
  replyForm: FormGroup;
  message: ContactFormModel;
  id: number;
  show: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private contactsService: ContactsService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
  ) { 
    this.replyForm = this.fb.group({
      "content": ['', [Validators.required, Validators.minLength(5), Validators.maxLength(1000)]]
    })
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.contactsService.get(this.id).subscribe(data => {
      this.message = data;
    })
  }

  showReply(){
    this.show = !this.show;
  }

  reply(){
    this.contactsService.reply(this.id, this.replyForm.value).subscribe(data => {
      this.toastr.success("Reply sent", "Success");
      this.router.navigate(["/administration/messages"])
    })
  }

  get content() {
    return this.replyForm.get('content');
  }
}
