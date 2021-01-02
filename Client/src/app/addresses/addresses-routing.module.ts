import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateAddressComponent } from './create-address/create-address.component';

const addressesRoutes: Routes = [
    { path: 'create', component: CreateAddressComponent },
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