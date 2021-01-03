import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProfileModel } from '../models/profile.model';
import { ProfilesService } from '../profiles.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  profileForm: FormGroup;
  profile: ProfileModel;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private profilesService: ProfilesService,
    private toastr: ToastrService,
  ) {
    this.profileForm = this.fb.group({
      'email': ['', [Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      'userName': ['', [Validators.minLength(2), Validators.maxLength(20)]],
      'firstName': ['', [Validators.minLength(2), Validators.maxLength(20)]],
      'lastName': ['', [Validators.minLength(2), Validators.maxLength(20)]],
      'avatarUrl': ['', Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')],
      'phoneNumber': ['', [Validators.minLength(4), Validators.maxLength(20)]],
    })
  }

  ngOnInit(): void {
    this.profilesService.getProfile().subscribe(res => {
      this.profile = res;
      this.profileForm = this.fb.group({
        'email': [this.profile.email],
        'userName': [this.profile.userName],
        'firstName': [this.profile.firstName],
        'lastName': [this.profile.lastName],
        'avatarUrl': [this.profile.avatarUrl],
        'phoneNumber': [this.profile.phoneNumber],
      })
    })
  }

  editProfile() {
    this.profilesService.editProfile(this.profileForm.value).subscribe(() => {
      this.router.navigate(["profiles/mine"]);
      this.toastr.success("Profile has been updated.", "Success")
    })
  }

  get email() {
    return this.profileForm.get('email');
  }

  get userName() {
    return this.profileForm.get('userName');
  }

  get firstName() {
    return this.profileForm.get('firstName');
  }

  get lastName() {
    return this.profileForm.get('lastName');
  }

  get avatarUrl() {
    return this.profileForm.get('avatarUrl');
  }

  get phoneNumber() {
    return this.profileForm.get('phoneNumber');
  }
}
