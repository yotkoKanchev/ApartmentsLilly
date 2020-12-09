import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateRoomComponent } from './create-room/create-room.component';
import { DetailsRoomComponent } from './details-room/details-room.component';
import { EditRoomComponent } from './edit-room/edit-room.component';

const roomsRoutes: Routes = [
    { path: 'create', component: CreateRoomComponent },
    { path: ':id', component: DetailsRoomComponent },
    { path: 'edit/:id', component: EditRoomComponent },
]

@NgModule({
    imports: [
        RouterModule.forChild(roomsRoutes),
    ],
    exports: [
        RouterModule
    ]
})

export class RoomsRoutingModule { }