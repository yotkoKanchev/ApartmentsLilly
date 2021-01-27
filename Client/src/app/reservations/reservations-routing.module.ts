import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateReservationComponent } from './create-reservation/create-reservation.component';
import { DetailsReservationComponent } from './details-reservation/details-reservation.component';
import { EditReservationComponent } from './edit-reservation/edit-reservation.component';
import { GuestReservationConfirmationComponent } from './guest-reservation-confirmation/guest-reservation-confirmation.component';
import { ListReservationsComponent } from './list-reservations/list-reservations.component';
import { MineReservationsComponent } from './mine-reservations/mine-reservations.component';
import { UserReservationConfirmationComponent } from './user-reservation-confirmation/user-reservation-confirmation.component';

const reservationsRoutes: Routes = [
    { path: '', component: CreateReservationComponent },
    { path: 'user-confirmation', component: UserReservationConfirmationComponent },
    { path: 'guest-confirmation', component: GuestReservationConfirmationComponent },
    { path: 'mine', component: MineReservationsComponent },
    { path: 'all/:status', component: ListReservationsComponent },
    { path: ':id', component: DetailsReservationComponent },
    { path: 'edit/:id', component: EditReservationComponent },
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