import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { authComponents } from '.';
import { AuthService } from './auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [
    ...authComponents,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers:[
    AuthService
  ]
})
export class AuthModule { }
