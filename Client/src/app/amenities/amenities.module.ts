import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmenitiesService } from './amenities.service';
import { amenitiesComponents} from '.';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'src/app/_modal';
import { CreateAmenityComponent } from './create-amenity/create-amenity.component';
import { EditAmenityComponent } from './edit-amenity/edit-amenity.component';

@NgModule({
  declarations: [
    ...amenitiesComponents,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ModalModule,
  ],
  providers:[
    AmenitiesService,
  ],
  exports:[
    CreateAmenityComponent,
    EditAmenityComponent,
  ]
})
export class AmenitiesModule { }
