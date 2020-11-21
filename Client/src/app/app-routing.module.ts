import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuardService } from './auth/guards/auth-guard.service';
import { CreateAddressComponent } from './addresses/create-address/create-address.component';
import { ListAddressesComponent } from './addresses/list-addresses/list-addresses.component';
import { EditAddressComponent } from './addresses/edit-address/edit-address.component';
import { StartComponent } from './start/start/start.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', component: StartComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'create', component:  CreateAddressComponent, canActivate: [AuthGuardService]},
  { path: 'addresses', component:  ListAddressesComponent, canActivate: [AuthGuardService]},
  { path: 'addresses/:id/edit', component:  EditAddressComponent, canActivate: [AuthGuardService]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
