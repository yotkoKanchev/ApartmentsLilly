import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuardService } from './auth/guards/auth-guard.service';
import { StartComponent } from './start/start.component';
import { ApartmentsRoutingModule } from './apartments/apartments-routing.module';
import { AddressesRoutingModule } from './addresses/addresses-routing.module';
import { AdminGuardService } from './auth/guards/admin-guard.service';
import { ProfilesRoutingModule } from './profiles/profiles-routing.module';
import { ReservationsRoutingModule } from './reservations/reservations-routing.module';
import { DeleteProfileComponent } from './profiles/delete-profile/delete-profile.component';
import { AdministrationsRoutingModule } from './administration/administration-routing.module';
import { ContactFormComponent } from './shared/contact-form/contact-form.component';

const routes: Routes = [

  { path: '', pathMatch: 'full', component: StartComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'delete', component: DeleteProfileComponent },
  { path: 'contacts', component: ContactFormComponent },
  { path: 'profiles', loadChildren: () => ProfilesRoutingModule },
  { path: 'apartments', loadChildren: () => ApartmentsRoutingModule, canActivate: [AuthGuardService, AdminGuardService] },
  { path: 'addresses', loadChildren: () => AddressesRoutingModule, canLoad: [AuthGuardService, AdminGuardService] },
  { path: 'reservations', loadChildren: () => ReservationsRoutingModule },
  { path: 'administration', loadChildren: () => AdministrationsRoutingModule, canActivate:[AdminGuardService] }
];

// TODO add canLoad and canActivate properly

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
