import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { profileComponents } from '.';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'src/app/_modal';
import { RouterModule } from '@angular/router';
import { ProfilesService } from './profiles.service';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { DeleteComponent } from './delete/delete.component';
import { AuthService } from '../auth/auth.service';

@NgModule({
  declarations: [
    ...profileComponents,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ModalModule,
    RouterModule, 
  ],
  providers: [
    ProfilesService,
    AuthService,
  ],
  exports: [
    ForgotPasswordComponent,
    DeleteComponent,
  ]
})
export class ProfilesModule { }
