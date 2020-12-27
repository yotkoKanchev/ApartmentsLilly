import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { ModalService } from 'src/app/_modal';
import { ApartmentListingModel } from '../models/apartment-listing.model';
import { SearchApartmentsModel } from '../models/search-apartments.model';

@Component({
  selector: 'app-apartment',
  templateUrl: './apartment.component.html',
  styleUrls: ['./apartment.component.css']
})
export class ApartmentComponent implements OnInit {
  @Input() ap: ApartmentListingModel;
  @Input() searchApartmentForm: SearchApartmentsModel;
  showMap: boolean;
  constructor(
    private authService: AuthService,
    private modalService: ModalService,

  ) { }

  ngOnInit(): void {
  }

  getMap() {
    this.showMap = !this.showMap;
  }

  makeRequest(){
    if (!this.authService.isAuthenticated()) {
    }
    console.log(this.searchApartmentForm)
    
  }
  
  openModal(id: string){
    this.modalService.open(id);
  }
}
