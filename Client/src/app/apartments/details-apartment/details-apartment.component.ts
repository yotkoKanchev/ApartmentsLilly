import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApartmentsService } from '../apartments.service';
import { ApartmentModel } from '../models/apartment.model';

@Component({
  selector: 'app-details-apartment',
  templateUrl: './details-apartment.component.html',
  styleUrls: ['./details-apartment.component.css']
})
export class DetailsApartmentComponent implements OnInit {
 apartment: ApartmentModel
 id: number;
  constructor(private apartmentsService: ApartmentsService,  private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.apartmentsService.getApartment(this.id).subscribe(res => {
        this.apartment = res;
      })
    })
  }

}
