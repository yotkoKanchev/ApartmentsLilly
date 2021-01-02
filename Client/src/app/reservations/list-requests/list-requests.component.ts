import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { RequestListingModel } from '../models/request-listing.model';
import { ReservationsService } from '../reservations.service';

@Component({
  selector: 'app-list-requests',
  templateUrl: './list-requests.component.html',
  styleUrls: ['./list-requests.component.css']
})
export class ListRequestsComponent implements OnInit {
  requests: Array<RequestListingModel>
  constructor(
    private reservationsService: ReservationsService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.fetchRequests();
  }

  cancelRequest(id: number) {
    this.reservationsService.cancelRequest(id).subscribe(() => {
      this.toastr.success("Success", "Request has been canceled.");
      setTimeout(() => {
        location.reload()
      }, 1000);
    })
  }

  fetchRequests() {
    this.reservationsService.getRequests().subscribe(data => {
      this.requests = data;
    })
  }
}
