import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateReservationComponent } from './create-reservation/create-reservation.component';
import { DetailsReservationComponent } from './details-reservation/details-reservation.component';
import { GuestReservationConfirmationComponent } from './guest-reservation-confirmation/guest-reservation-confirmation.component';
import { ListReservationsComponent } from './list-reservations/list-reservations.component';
import { UserReservationConfirmationComponent } from './user-reservation-confirmation/user-reservation-confirmation.component';

const reservationsRoutes: Routes = [
    { path: '', component: CreateReservationComponent },
    { path: 'user-confirmation', component: UserReservationConfirmationComponent },
    { path: 'guest-confirmation', component: GuestReservationConfirmationComponent },
    { path: 'all', component: ListReservationsComponent },
    { path: ':id', component: DetailsReservationComponent },
]

@NgModule({
    imports: [
        RouterModule.forChild(reservationsRoutes),
    ],
    exports: [
        RouterModule
    ]
})

export class ReservationsRoutingModule { }