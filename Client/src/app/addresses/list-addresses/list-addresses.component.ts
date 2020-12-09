import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddressesService } from '../addresses.service';
import { AddressModel } from '../models/address.model';

@Component({
  selector: 'app-list-addresses',
  templateUrl: './list-addresses.component.html',
  styleUrls: ['./list-addresses.component.css']
})
export class ListAddressesComponent implements OnInit {
  addresses: Array<AddressModel>;
  constructor(private addressService: AddressesService, private router: Router) { }

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
      this.fetchAddresses()
    })
  }
}
