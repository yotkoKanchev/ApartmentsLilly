import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ModalService } from '../../_modal';
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
    private modalService: ModalService,
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
    console.log(this.apartmentId, this.addressId)
    this.apartmentService.changeAddress(this.apartmentId, this.addressId)
      .subscribe(data => {
        console.log(data)
        this.toastrService.success("Success", "Address has been changed.");
        this.router.navigate([`apartments/${this.apartmentId}`])
      });
  }

  getAddressId(data: number) {
    this.addressId = data;
  }

  openModal(id: string) {
    this.modalService.open(id);
  }
}
