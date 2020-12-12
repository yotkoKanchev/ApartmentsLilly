import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmenitiesService } from './amenities.service';
import { amenitiesComponents} from '.';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { ModalModule } from 'src/app/_modal';
import { CreateAmenityComponent } from './create-amenity/create-amenity.component';

@NgModule({
  declarations: [
    ...amenitiesComponents,
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
