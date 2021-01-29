import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';
import { ProfilesService } from 'src/app/profiles/profiles.service';
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
  contactForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private profilesService: ProfilesService,
    private contactsService: ContactsService,
    private toastrService: ToastrService,
    private router: Router,
  ) {
    this.contactForm = this.fb.group({
      "name": ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      "email": ['', [Validators.required, Validators.email]],
      "title": ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      "content": ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]]
    })
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.profilesService.getProfile().subscribe(profile => {
        this.contactForm = this.fb.group({
          'name': profile.firstName + ' ' + profile.lastName,
          'email': profile.email,
          'title': '',
          'content': '',
        })
      });
    } else {
      this.contactForm = this.fb.group({
        'name': '',
        'email': '',
        'title': '',
        'content': '',
      })
    }
  }

  submit() {
    this.contactsService.submitContactForm(this.contactForm.value).subscribe(data => {
      this.toastrService.success("Message sent", "Success");
      this.router.navigate(["tankYou"])
    })
  }

  get name() {
    return this.contactForm.get('name');
  }
  get email() {
    return this.contactForm.get('email');
  }
  get title() {
    return this.contactForm.get('title');
  }
  get content() {
    return this.contactForm.get('content');
  }

}
