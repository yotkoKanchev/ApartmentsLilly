import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './auth/auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuardService } from './auth/guards/auth-guard.service';
import { TokenInterceptorService } from './interceptors/token-interceptor.service';
import { ErrorInterceptorService } from './interceptors/error-interceptor.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CreateAddressComponent } from './addresses/create-address/create-address.component';
import { AddressesService } from './addresses/address.service';
import { ListAddressesComponent } from './addresses/list-addresses/list-addresses.component';
import { EditAddressComponent } from './addresses/edit-address/edit-address.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { StartComponent } from './start/start/start.component';
import { CreateApartmentComponent } from './apartments/create-apartment/create-apartment.component';
import { EditApartmentComponent } from './apartments/edit-apartment/edit-apartment.component';
import { ListApartmentsComponent } from './apartments/list-apartments/list-apartments.component';
import { ApartmentsService } from './apartments/apartments.service';
import { DetailsApartmentComponent } from './apartments/details-apartment/details-apartment.component';
import { DeleteApartmentComponent } from './apartments/delete-apartment/delete-apartment.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    CreateAddressComponent,
    ListAddressesComponent,
    EditAddressComponent,
    HeaderComponent,
    FooterComponent,
    StartComponent,
    CreateApartmentComponent,
    EditApartmentComponent,
    ListApartmentsComponent,
    DetailsApartmentComponent,
    DeleteApartmentComponent,
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
    AddressesService,
    ApartmentsService,
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
