import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateAddressComponent } from './create-address/create-address.component';
import { EditAddressComponent } from './edit-address/edit-address.component';
import { ListAddressesComponent } from './list-addresses/list-addresses.component';

const addressesRoutes: Routes = [
    { path: 'create', component: CreateAddressComponent },
    { path: 'edit/:id', component: EditAddressComponent },
    { path: '', component: ListAddressesComponent },
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