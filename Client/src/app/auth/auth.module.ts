import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { authComponents } from '.';
import { AuthService } from './auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { ModalModule } from '../_modal';
import { ProfilesModule } from '../profiles/profiles.module';

@NgModule({
  declarations: [
    ...authComponents,
  ],
  imports: [
    ProfilesModule,
    CommonModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ModalModule,
  ],
  providers:[
    AuthService,
  ],
  exports:[  ]
})
export class AuthModule { }
