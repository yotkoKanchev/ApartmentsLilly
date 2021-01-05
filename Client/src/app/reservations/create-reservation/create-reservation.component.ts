import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SearchApartmentsModel } from 'src/app/apartments/models/search-apartments.model';
import { AuthService } from 'src/app/auth/auth.service';
import { ProfilesService } from 'src/app/profiles/profiles.service';
import { ReservationsService } from '../reservations.service';

@Component({
    selector: 'app-create-reservation',
    templateUrl: './create-reservation.component.html',
    styleUrls: ['./create-reservation.component.css']
})
export class CreateReservationComponent implements OnInit {
    reservationRequestForm: FormGroup;
    @Input() searchApartmentForm: SearchApartmentsModel;

    constructor(
        private porfileService: ProfilesService,
        private authService: AuthService,
        private reservationsService: ReservationsService,
        private router: Router,
        private fb: FormBuilder,
        private toastrService: ToastrService,
    ) {
        this.reservationRequestForm = this.fb.group({
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
                this.reservationRequestForm = this.fb.group({
                    'firstName': profile.firstName,
                    'lastName': profile.lastName,
                    'email': profile.email,
                    'phoneNumber': profile.phoneNumber,
                    'additionalInfo': '',
                })
            });
        } else {
            this.reservationRequestForm = this.fb.group({
                'firstName': '',
                'lastName': '',
                'email': '',
                'phoneNumber': '',
                'additionalInfo': '',
            })
        }
    }

    create() {
        this.reservationsService.sendReservationRequest(this.searchApartmentForm, this.reservationRequestForm.value).subscribe(data => {
            this.toastrService.success("Reservation Request sent", "Success");
            this.reservationsService.setConfirmationDetails(data);
            var urlToNavigate = this.authService.isAuthenticated() ? "reservations/user-confirmation" : "reservations/guest-confirmation"
            this.router.navigate([urlToNavigate])
        })
    }

    get firstName() {
        return this.reservationRequestForm.get('firstName');
    }

    get lastName() {
        return this.reservationRequestForm.get('lastName');
    }

    get email() {
        return this.reservationRequestForm.get('email');
    }

    get phoneNumber() {
        return this.reservationRequestForm.get('phoneNumber');
    }

    get additionalInfo() {
        return this.reservationRequestForm.get('additionalInfo');
    }
}
