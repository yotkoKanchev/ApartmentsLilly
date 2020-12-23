import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuardService } from './auth/guards/auth-guard.service';
import { StartComponent } from './start/start.component';
import { ApartmentsRoutingModule } from './apartments/apartments-routing.module';
import { RoomsRoutingModule } from './rooms/rooms-routing.module';
import { AddressesRoutingModule } from './addresses/addresses-routing.module';
import { AmenitiesRoutingModule } from './amenities/amenities-routing.module';
import { AdminGuardService } from './auth/guards/admin-guard.service';
import { ProfilesRoutingModule } from './profiles/profiles-routing.module';
import { DeleteComponent } from './profiles/delete/delete.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: StartComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'delete', component: DeleteComponent },
  { path: 'profiles', loadChildren: () => ProfilesRoutingModule },
  { path: 'apartments', loadChildren: () => ApartmentsRoutingModule, canActivate: [AuthGuardService, AdminGuardService] },
  { path: 'addresses', loadChildren: () => AddressesRoutingModule, canActivate: [AuthGuardService, AdminGuardService] },
  { path: 'rooms', loadChildren: () => RoomsRoutingModule, canActivate: [AuthGuardService, AdminGuardService] },
  { path: 'amenities', loadChildren: () => AmenitiesRoutingModule, canActivate: [AuthGuardService, AdminGuardService] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
