import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmenitiesService } from './amenities.service';
import { amenitiesComponents} from '.';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'src/app/_modal';
import { RouterModule } from '@angular/router';
import { CreateAmenityComponent } from './create-amenity/create-amenity.component';

@NgModule({
  declarations: [
    ...amenitiesComponents,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ModalModule,
    RouterModule, 
  ],
  providers:[
    AmenitiesService,
  ],
  exports:[
    CreateAmenityComponent,
  ]
})
export class AmenitiesModule { }
