import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListProfilesComponent } from '../profiles/list-profiles/list-profiles.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const administrationRoutes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'profiles', component: ListProfilesComponent },
    // { path: ':id', component: DetailsApartmentComponent },
    // { path: ':id/changeAddress', component: ApartmentChangeAddressComponent },
]

@NgModule({
    imports: [
        RouterModule.forChild(administrationRoutes),
    ],
    exports: [
        RouterModule
    ]
})

export class AdministrationsRoutingModule { }