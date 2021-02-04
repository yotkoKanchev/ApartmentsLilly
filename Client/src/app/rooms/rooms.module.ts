import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { roomComponents } from '.';
import { RoomsService } from './rooms.service';
import { CreateRoomComponent } from './create-room/create-room.component';
import { EditRoomComponent } from './edit-room/edit-room.component';
import { RouterModule } from '@angular/router';
import { DeleteRoomComponent } from './delete-room/delete-room.component';

@NgModule({
  declarations: [
    ...roomComponents,
  ],
  imports: [  
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  providers: [
    RoomsService,
  ],
  exports: [
    CreateRoomComponent,
    EditRoomComponent,  
    DeleteRoomComponent
  ]
})
export class RoomsModule { }
