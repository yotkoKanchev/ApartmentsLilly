import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ModalService } from 'src/app/_modal';
import { ProfilesService } from '../profiles.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private modalService: ModalService,
    private profilesService: ProfilesService,
    private toastr: ToastrService,
    ) {
    this.changePasswordForm = this.fb.group({
      'password': ['', [Validators.required, Validators.minLength(6)]],
      'newPassword': ['', [Validators.required, Validators.minLength(6)]],
      'newConfirmPassword': ['', Validators.minLength(6)],
    },
      { validator: [this.checkPasswords] }
    );
   }

  ngOnInit(): void {
    this.changePasswordForm.reset();
  }

  checkPasswords(group: FormGroup) {
    return group.get('newPassword').value === group.get('newConfirmPassword').value
      ? null
      : { notSame: "Passwords do not match." }
  }

  changePassword() {
    this.profilesService.changePassword(this.changePasswordForm.value).subscribe(() =>
    this.closeModal());
    this.changePasswordForm.reset();
    this.toastr.success("Password has been changed.", "Success")
  }

  closeModal() {
    this.modalService.close("change-password-modal");
  }
  
  get password() {
    return this.changePasswordForm.get('password')
  }

  get newPassword() {
    return this.changePasswordForm.get('newPassword')
  }

  get newConfirmPassword() {
    return this.changePasswordForm.get('newConfirmPassword')
  }

}
