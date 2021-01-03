import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApartmentsService } from '../apartments.service';

@Component({
  selector: 'app-apartment-change-address',
  templateUrl: './apartment-change-address.component.html',
  styleUrls: ['./apartment-change-address.component.css']
})
export class ApartmentChangeAddressComponent implements OnInit {
  addressId: number;
  apartmentId: number;

  constructor(
    private apartmentService: ApartmentsService,
    private toastrService: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.apartmentId = params['id'];
    })
  }

  changeAddress() {
    this.apartmentService.changeAddress(this.apartmentId, this.addressId)
      .subscribe(() => {
        this.toastrService.success("Success", "Address has been changed.");
        this.router.navigate([`apartments/${this.apartmentId}`])
      });
  }

  getAddressId(data: number) {
    this.addressId = data;
  }
}
