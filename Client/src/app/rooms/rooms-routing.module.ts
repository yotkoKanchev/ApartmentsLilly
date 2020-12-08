import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateRoomComponent } from './create-room/create-room.component';

const roomsRoutes: Routes = [
    { path: 'create', component: CreateRoomComponent },
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