import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './auth/auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuardService } from './guards/auth-guard.service';
import { TokenInterceptorService } from './interceptors/token-interceptor.service';
import { ErrorInterceptorService } from './interceptors/error-interceptor.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CreateAddressComponent } from './addresses/create-address/create-address.component';
import { AddressService } from './addresses/address.service';
import { ListAddressesComponent } from './addresses/list-addresses/list-addresses.component';
import { EditAddressComponent } from './addresses/edit-address/edit-address.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    CreateAddressComponent,
    ListAddressesComponent,
    EditAddressComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    AuthService, 
    AddressService,
    AuthGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptorService,
      multi: true
    }
],
  bootstrap: [AppComponent]
})

export class AppModule { }
