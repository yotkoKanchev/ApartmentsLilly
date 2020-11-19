import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddressService } from '../address.service';
import { AddressListingModel } from '../models/list-address.model';

@Component({
  selector: 'app-list-addresses',
  templateUrl: './list-addresses.component.html',
  styleUrls: ['./list-addresses.component.css']
})
export class ListAddressesComponent implements OnInit {
  addresses: Array<AddressListingModel>;
  constructor(private addressService: AddressService, private router: Router) { }

  ngOnInit(): void {
    this.fetchAddresses();
  }

  private fetchAddresses() {
    this.addressService.getAddresses().subscribe(addresses => {
      this.addresses = addresses;
    })
  }

  editAddress(id: string) {
    this.router.navigate(["addresses", id, "edit"])
  }

  deleteAddress(id: string) {
    console.log(id);
    this.addressService.deleteAddress(id).subscribe(() => {
      console.log('is here')
      this.fetchAddresses()
    })
  }
}
