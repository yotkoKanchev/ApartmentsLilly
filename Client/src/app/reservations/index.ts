import { GuestReservationConfirmationComponent } from "./guest-reservation-confirmation/guest-reservation-confirmation.component";
import { UserReservationConfirmationComponent } from "./user-reservation-confirmation/user-reservation-confirmation.component";
import { CreateReservationComponent } from './create-reservation/create-reservation.component';
import { MineReservationsComponent } from "./mine-reservations/mine-reservations.component";
import { DetailsReservationComponent } from "./details-reservation/details-reservation.component";
import { EditReservationComponent } from "./edit-reservation/edit-reservation.component";


export const reservationComponents = [
    CreateReservationComponent,
    UserReservationConfirmationComponent,
    GuestReservationConfirmationComponent,
    MineReservationsComponent,
    DetailsReservationComponent,
    EditReservationComponent,
]