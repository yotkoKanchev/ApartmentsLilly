import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateAddressComponent } from './create-address/create-address.component';
import { EditAddressComponent } from './edit-address/edit-address.component';

const addressesRoutes: Routes = [
    { path: 'create', component: CreateAddressComponent },
    { path: 'edit/:id/:apartmentId', component: EditAddressComponent },
]

@NgModule({
    imports: [
        RouterModule.forChild(addressesRoutes),
    ],
    exports: [
        RouterModule
    ]
})

export class AddressesRoutingModule { }