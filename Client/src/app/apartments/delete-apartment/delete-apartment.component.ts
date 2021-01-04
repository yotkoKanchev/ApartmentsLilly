import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApartmentsService } from '../apartments.service';

@Component({
  selector: 'app-delete-apartment',
  templateUrl: './delete-apartment.component.html',
  styleUrls: ['./delete-apartment.component.css']
})
export class DeleteApartmentComponent {
  @Input() apartmentId: string;
  constructor(
    private apartmentsService: ApartmentsService,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  deleteApartment() {
    this.apartmentsService.deleteApartment(this.apartmentId).subscribe(() => {
      this.toastr.success("Apartment has been deleted!", "Success");
      this.router.navigate(['apartments'])
    })
  }

}
