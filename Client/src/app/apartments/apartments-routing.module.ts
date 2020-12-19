import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateApartmentComponent } from './create-apartment/create-apartment.component';
import { ListApartmentsComponent } from './list-apartments/list-apartments.component';
import { DetailsApartmentComponent } from './details-apartment/details-apartment.component';
import { EditApartmentComponent } from './edit-apartment/edit-apartment.component';
import { ApartmentChangeAddressComponent } from './apartment-change-address/apartment-change-address.component';

const apartmentsRoutes: Routes = [
    { path: 'create', component: CreateApartmentComponent },
    { path: '', component: ListApartmentsComponent },
    { path: ':id', component: DetailsApartmentComponent },
    { path: 'edit/:id', component: EditApartmentComponent },
    { path: ':id/changeAddress', component: ApartmentChangeAddressComponent },
]

@NgModule({
    imports: [
        RouterModule.forChild(apartmentsRoutes),
    ],
    exports: [
        RouterModule
    ]
})

export class ApartmentsRoutingModule { }