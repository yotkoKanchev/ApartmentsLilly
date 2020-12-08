import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { ModalModule } from '../_modal';
import { roomComponents } from '.';
import { RoomsService } from './rooms.service';
import { CreateRoomComponent } from './create-room/create-room.component';

@NgModule({
  declarations: [
    ...roomComponents
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ModalModule,
  ],
  providers:[
    RoomsService
  ],
  exports:[
    CreateRoomComponent
  ]
})
export class RoomsModule { }
