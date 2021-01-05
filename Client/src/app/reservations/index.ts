import { GuestReservationConfirmationComponent } from "./guest-reservation-confirmation/guest-reservation-confirmation.component";
import { UserReservationConfirmationComponent } from "./user-reservation-confirmation/user-reservation-confirmation.component";
import { CreateReservationComponent } from './create-reservation/create-reservation.component';
import { ListReservationsComponent } from "./list-reservations/list-reservations.component";
import { DetailsReservationComponent } from "./details-reservation/details-reservation.component";


export const reservationComponents = [
    CreateReservationComponent,
    UserReservationConfirmationComponent,
    GuestReservationConfirmationComponent,
    ListReservationsComponent,
    DetailsReservationComponent,
]