import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './auth/auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuardService } from './auth/guards/auth-guard.service';
import { TokenInterceptorService } from './_interceptors/token-interceptor.service';
import { ErrorInterceptorService } from './_interceptors/error-interceptor.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { StartComponent } from './start/start.component';
import { AuthModule } from './auth/auth.module';
import { ApartmentsModule } from './apartments/apartments.module';
import { RoomsModule } from './rooms/rooms.module';
import { AddressesModule } from './addresses/addresses.module';
import { AmenitiesModule } from './amenities/amenities.module';
import { BedsModule } from './beds/beds.module';
import { ProfilesModule } from './profiles/profiles.module';
import { ReservationsModule } from './reservations/reservations.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardComponent } from './administration/dashboard/dashboard.component';
import { ContactFormComponent } from './shared/contact-form/contact-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    StartComponent,
    DashboardComponent,
    ContactFormComponent,
  ],
  imports: [
    AuthModule,
    ProfilesModule,
    ApartmentsModule,
    AddressesModule,
    RoomsModule,
    AmenitiesModule,
    BedsModule,
    ReservationsModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    NgbModule,
  ],
  providers: [
    AuthService,
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
