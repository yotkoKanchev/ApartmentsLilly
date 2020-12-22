import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfilesService } from '../profiles.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ModalService } from 'src/app/_modal';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private modalService: ModalService,
    private profilesService: ProfilesService,
    private router: Router,
    private toastrService: ToastrService,

  ) {
    this.forgotPasswordForm = this.fb.group({
      'email': ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    });
  }

  ngOnInit(): void {
  }

  submit(id: string) {
    this.profilesService.forgotPassword(this.forgotPasswordForm.value).subscribe(() => {
      this.toastrService.success("Reset link has been sent.", "Success");
      this.closeModal();
      this.router.navigate(['/']);
    });
  }

  closeModal() {
    this.modalService.close('forgot-password-modal');
  }

  get email() {
    return this.forgotPasswordForm.get('email')
  }
}
