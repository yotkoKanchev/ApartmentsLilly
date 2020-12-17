import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AddressesService } from '../addresses.service';
import { AddressModel } from '../models/address.model';
import { ModalService } from '../../_modal';

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
    private modalService: ModalService,) {  }

  create(): void{
  }

  ngOnInit(): void {
    this.addressesService.getAddresses().subscribe(data => {
      this.addresses = data;
    });
  }

  onOptionsSelected(value: any) {
    if (value == "addAddress") {
      this.openModal('add-address-modal');
    }
    else{
      this.onAddressIdSelected.emit(+value)
    }
  }

  openModal(id: string) {
    this.modalService.open(id);
  }
}
