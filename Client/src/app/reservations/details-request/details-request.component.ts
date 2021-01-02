import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RequestDetailsModel } from '../models/request-details.model';
import { ReservationsService } from '../reservations.service';

@Component({
  selector: 'app-details-request',
  templateUrl: './details-request.component.html',
  styleUrls: ['./details-request.component.css']
})
export class DetailsRequestComponent implements OnInit {
  id: number;
  request: RequestDetailsModel;
  constructor(
    private reservationsService: ReservationsService, 
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router:Router,
    ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.fetchRequest(this.id);
    });
  }

  fetchRequest(id: number) {
    this.reservationsService.getRequest(id).subscribe(req => {
      this.request = req;
    })
  }

  cancelRequest(id: number) {
    this.reservationsService.cancelRequest(id).subscribe(() => {
      this.toastr.success("Success", "Request has been canceled.");
      this.router.navigate(['reservations/requests'])
    })
  }
}
