import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { profileComponents } from '.';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProfilesService } from './profiles.service';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AuthService } from '../auth/auth.service';
import { DeleteProfileComponent } from './delete-profile/delete-profile.component';
import { UploadFilesComponent } from '../_filesUpload/upload-files/upload-files.component';

@NgModule({
  declarations: [
    ...profileComponents,
    UploadFilesComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  providers: [
    ProfilesService,
    AuthService,
  ],
  exports: [
    ForgotPasswordComponent,
    DeleteProfileComponent,
  ]
})
export class ProfilesModule { }
