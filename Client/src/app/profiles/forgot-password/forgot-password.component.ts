import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfilesService } from '../profiles.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private profilesService: ProfilesService,
    private router: Router,
    private toastrService: ToastrService,

  ) {
    this.forgotPasswordForm = this.fb.group({
      'email': ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    });
  }

  submit(id: string) {
    this.profilesService.forgotPassword(this.forgotPasswordForm.value).subscribe(() => {
      this.toastrService.success("Reset link has been sent.", "Success");
      this.router.navigate(['/']);
    });
  }

  get email() {
    return this.forgotPasswordForm.get('email')
  }
}
