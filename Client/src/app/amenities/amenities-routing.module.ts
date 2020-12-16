import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditAmenityComponent } from './edit-amenity/edit-amenity.component';

const amenitiesRoutes: Routes = [
    { path: 'edit/:id/:apartmentId', component: EditAmenityComponent },
]

@NgModule({
    imports: [
        RouterModule.forChild(amenitiesRoutes),
    ],
    exports: [
        RouterModule
    ]
})

export class AmenitiesRoutingModule { }