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
import { ContactsModule } from './contacts/contacts.module';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarComponent } from './_calendar/calendar.component';
import { UploadFileService } from './_filesUpload/upload-files.service';
import { CloudinaryModule } from '@cloudinary/angular-5.x';
import { Cloudinary } from '@cloudinary/angular-5.x';
// import * as  Cloudinary from 'cloudinary-core';

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  listPlugin,
  interactionPlugin
])

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    StartComponent,
    DashboardComponent,
    CalendarComponent,
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
    ContactsModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    NgbModule,
    FullCalendarModule,
    CloudinaryModule.forRoot(Cloudinary, { cloud_name: 'dziee8jfp' }),
  ],
  providers: [
    AuthService,
    UploadFileService,
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
  exports: [
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
