import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmenitiesService } from './amenities.service';
import { amenitiesComponents} from '.';
import { CreateAmenityComponent } from './create-amenity/create-amenity.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { ModalModule } from 'src/app/_modal';

@NgModule({
  declarations: [
    ...amenitiesComponents,
    CreateAmenityComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ModalModule,
  ],
  providers:[
    AmenitiesService,
  ],
  exports:[
    CreateAmenityComponent,
  ]
})
export class AmenitiesModule { }
