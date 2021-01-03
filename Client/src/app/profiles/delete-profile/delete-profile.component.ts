import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-delete-profile',
  templateUrl: './delete-profile.component.html',
  styleUrls: ['./delete-profile.component.css']
})
export class DeleteProfileComponent {
  deleteForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
  ) {
    this.deleteForm = this.fb.group({

      'password': ['', [Validators.required]],
      'confirmPassword': ['',]
    },
      { validator: [this.checkPasswords] }
    );
  }

  delete() {
    this.authService.delete(this.deleteForm.value).subscribe(() => {
      this.toastr.success("Account deleted.", "Success")
      this.authService.logout();
    });
  }

  checkPasswords(group: FormGroup) {
    return group.get('password').value === group.get('confirmPassword').value
      ? null
      : { notSame: "Passwords do not match." }
  }

  get password() {
    return this.deleteForm.get('password');
  }

  get confirmPassword() {
    return this.deleteForm.get('confirmPassword');
  }
}
