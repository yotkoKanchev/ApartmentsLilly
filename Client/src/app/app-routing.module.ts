import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuardService } from './auth/guards/auth-guard.service';
import { CreateAddressComponent } from './addresses/create-address/create-address.component';
import { ListAddressesComponent } from './addresses/list-addresses/list-addresses.component';
import { EditAddressComponent } from './addresses/edit-address/edit-address.component';
import { StartComponent } from './start/start/start.component';
import { CreateApartmentComponent } from './apartments/create-apartment/create-apartment.component';
import { ListApartmentsComponent } from './apartments/list-apartments/list-apartments.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', component: StartComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'addresses/create', component:  CreateAddressComponent, canActivate: [AuthGuardService]},
  { path: 'addresses', component:  ListAddressesComponent, canActivate: [AuthGuardService]},
  { path: 'addresses/:id/edit', component:  EditAddressComponent, canActivate: [AuthGuardService]},
  { path: 'apartments/create', component:  CreateApartmentComponent, canActivate: [AuthGuardService]},
  { path: 'apartments/:id/edit', component:  CreateApartmentComponent, canActivate: [AuthGuardService]},
  { path: 'apartments', component:  ListApartmentsComponent, canActivate: [AuthGuardService]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
