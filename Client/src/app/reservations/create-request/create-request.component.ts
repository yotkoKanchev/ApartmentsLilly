import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SearchApartmentsModel } from 'src/app/apartments/models/search-apartments.model';
import { AuthService } from 'src/app/auth/auth.service';
import { ProfilesService } from 'src/app/profiles/profiles.service';
import { ModalService } from 'src/app/_modal';
import { ReservationsService } from '../reservations.service';

@Component({
  selector: 'app-create-request',
  templateUrl: './create-request.component.html',
  styleUrls: ['./create-request.component.css']
})
export class CreateRequestComponent implements OnInit {
  requestForm: FormGroup;
  @Input() apartmentName: string;
  @Input() apartmentId: number;
  @Input() searchApartmentForm: SearchApartmentsModel;

  constructor(
    private porfileService: ProfilesService,
    private authService: AuthService,
    private reservationsService: ReservationsService,
    private router: Router,
    private fb: FormBuilder,
    private modalService: ModalService,
    private toastrService: ToastrService,
  ) {
    this.requestForm = this.fb.group({
      "FirstName": [Validators.required],
      "LastName": [Validators.required],
      "Email": [Validators.required],
      "PhoneNumber": [Validators.required],
      "From": [Validators.required],
      "To": [Validators.required],
      "Adults": [Validators.required],
      "Children": [Validators.required],
      "Infants": [Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.porfileService.getProfile().subscribe(profile => {
        this.requestForm = this.fb.group({
          'FirstName': profile.firstName,
          'LastName': profile.lastName,
          'Email': profile.email,
          'PhoneNumber': profile.phoneNumber,
        })
      });
    } else {
      this.requestForm = this.fb.group({
        'FirstName': '',
        'LastName': '',
        'Email': '',
        'PhoneNumber': '',
      })
    }
  }

  create() {
    this.reservationsService.sendRequest(this.apartmentId, this.searchApartmentForm, this.requestForm.value).subscribe(() => {
      this.toastrService.success("Request sent", "Success");
      this.closeModal();
      this.router.navigate(['/']);
    })
  }

  closeModal() {
    this.modalService.close('create-request-modal');
  }

  get firstName() {
    return this.requestForm.get('FirstName');
  }

  get lastName() {
    return this.requestForm.get('LastName');
  }

  get email() {
    return this.requestForm.get('Email');
  }

  get phoneNumber() {
    return this.requestForm.get('PhoneNumber');
  }
}
