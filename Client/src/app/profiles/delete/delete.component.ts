import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';
import { ModalService } from 'src/app/_modal';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
  deleteForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private modalService: ModalService,
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

  ngOnInit(): void {
  }

  delete() {
    this.authService.delete(this.deleteForm.value).subscribe(() => {
      this.toastr.success("Account deleted." , "Success")
      this.authService.logout();
    });
  }

  checkPasswords(group: FormGroup) {
    return group.get('password').value === group.get('confirmPassword').value
      ? null
      : { notSame: "Passwords do not match." }
  }

  closeModal() {
    this.modalService.close("delete-account-modal");
  }

  get password(){
    return this.deleteForm.get('password');
  }

  get confirmPassword(){
    return this.deleteForm.get('confirmPassword');
  }

}
