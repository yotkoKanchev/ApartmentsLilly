import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuardService } from './auth/guards/auth-guard.service';
import { StartComponent } from './start/start.component';
import { ApartmentsRoutingModule } from './apartments/apartments-routing.module';
import { RoomsRoutingModule } from './rooms/rooms-routing.module';
import { AddressesRoutingModule } from './addresses/addresses-routing.module';
import { EditRoomComponent } from './rooms/edit-room/edit-room.component';
import { EditAmenityComponent } from './amenities/edit-amenity/edit-amenity.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', component: StartComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  // { path: 'addresses/create', component: CreateAddressComponent, canActivate: [AuthGuardService] },
  // { path: 'addresses', component: ListAddressesComponent, canActivate: [AuthGuardService] },
  // { path: 'addresses/:id/edit', component: EditAddressComponent, canActivate: [AuthGuardService] },
  // { path: 'apartments/create', component:  CreateApartmentComponent, canActivate: [AuthGuardService]},
  // { path: 'apartments/edit/:id', component:  EditApartmentComponent, canActivate: [AuthGuardService]},
  // { path: 'apartments/:id', component:  DetailsApartmentComponent, canActivate: [AuthGuardService]},
  // { path: 'apartments', component:  ListApartmentsComponent, canActivate: [AuthGuardService]},
  // { path: 'rooms/create', component: CreateRoomComponent, canActivate: [AuthGuardService] },
  { path: 'apartments', loadChildren: () => ApartmentsRoutingModule, canActivate: [AuthGuardService] },
  { path: 'addresses', loadChildren: () => AddressesRoutingModule, canActivate: [AuthGuardService] },
  { path: 'rooms', loadChildren: () => RoomsRoutingModule, canActivate: [AuthGuardService] },
  { path: 'rooms/edit/:id', component: EditRoomComponent },
  { path: 'amenities/edit/:id/:apartmentId', component: EditAmenityComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
