import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { authComponents } from '.';
import { AuthService } from './auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
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
  ],
  providers: [
    AuthService,
  ]
})
export class AuthModule { }
