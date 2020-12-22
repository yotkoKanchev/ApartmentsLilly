import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bedComponents } from '.';
import { BedsService } from './beds.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from '../_modal';
import { RouterModule } from '@angular/router';
import { CreateBedComponent } from './create-bed/create-bed.component';

@NgModule({
  declarations: [
    ... bedComponents,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ModalModule,
    RouterModule,
  ],
  providers: [
    BedsService,
  ],
  exports:[
    CreateBedComponent,
  ]
})
export class BedsModule { }
