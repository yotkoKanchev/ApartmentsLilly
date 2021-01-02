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
      'firstName': ['', [Validators.minLength(2), Validators.maxLength(20), Validators.required]],
      'lastName': ['', [Validators.minLength(2), Validators.maxLength(20), Validators.required]],
      'email': ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      'phoneNumber': ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      'additionalInfo': [''],
    });
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.porfileService.getProfile().subscribe(profile => {
        this.requestForm = this.fb.group({
          'firstName': profile.firstName,
          'lastName': profile.lastName,
          'email': profile.email,
          'phoneNumber': profile.phoneNumber,
          'additionalInfo': '',
        })
      });
    } else {
      this.requestForm = this.fb.group({
        'firstName': '',
        'lastName': '',
        'email': '',
        'phoneNumber': '',
        'additionalInfo': '',
      })
    }
  }

  create() {
    this.reservationsService.sendRequest(this.searchApartmentForm, this.requestForm.value).subscribe(data => {
      this.toastrService.success("Request sent", "Success");
      this.closeModal();
      this.reservationsService.setConfirmationDetails(data);

      var urlToNavigate = this.authService.isAuthenticated() ? "reservations/user-request-confirmation" : "reservations/guest-request-confirmation"
      this.router.navigate([urlToNavigate])
    })
  }

  closeModal() {
    this.modalService.close('create-request-modal');
  }

  get firstName() {
    return this.requestForm.get('firstName');
  }

  get lastName() {
    return this.requestForm.get('lastName');
  }

  get email() {
    return this.requestForm.get('email');
  }

  get phoneNumber() {
    return this.requestForm.get('phoneNumber');
  }

  get additionalInfo() {
    return this.requestForm.get('additionalInfo');
  }
}
