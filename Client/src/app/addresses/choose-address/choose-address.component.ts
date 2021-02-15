import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AddressesService } from '../addresses.service';
import { AddressModel } from '../models/address.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-choose-address',
  templateUrl: './choose-address.component.html',
  styleUrls: ['./choose-address.component.css']
})
export class ChooseAddressComponent implements OnInit {
  addresses: Array<AddressModel>
  addressId: number;
  @Output() onAddressIdSelected: EventEmitter<number> = new EventEmitter<number>();

  constructor(
    private addressesService: AddressesService,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.addressesService.getAddresses().subscribe(data => {
      this.addresses = data;
    });
  }

  onOptionsSelected(value: any, content) {
    if (value == "addAddress") {
      this.openModal(content);
    }
    else {
      this.onAddressIdSelected.emit(+value)
    }
  }

  openModal(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-create-address' });
  }
}
