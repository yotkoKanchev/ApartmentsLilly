import { Component, OnInit } from '@angular/core';
import { RequestListingModel } from '../models/request-listing.model';
import { ReservationsService } from '../reservations.service';

@Component({
  selector: 'app-list-requests',
  templateUrl: './list-requests.component.html',
  styleUrls: ['./list-requests.component.css']
})
export class ListRequestsComponent implements OnInit {
  requests: Array<RequestListingModel>
  constructor(private reservationsService: ReservationsService) { }

  ngOnInit(): void {
    this.reservationsService.getRequests().subscribe(data => {
      console.log(data)
      this.requests = data;
    })
  }

}
