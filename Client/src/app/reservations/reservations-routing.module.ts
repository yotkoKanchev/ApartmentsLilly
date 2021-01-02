import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateRequestComponent } from './create-request/create-request.component';
import { DetailsRequestComponent } from './details-request/details-request.component';
import { GuestRequestConfirmationComponent } from './guest-request-confirmation/guest-request-confirmation.component';
import { ListRequestsComponent } from './list-requests/list-requests.component';
import { UserRequestConfirmationComponent } from './user-request-confirmation/user-request-confirmation.component';

const reservationsRoutes: Routes = [
    { path: 'request', component: CreateRequestComponent },
    { path: 'user-request-confirmation', component: UserRequestConfirmationComponent },
    { path: 'guest-request-confirmation', component: GuestRequestConfirmationComponent },
    { path: 'requests', component: ListRequestsComponent },
    { path: 'requests/:id', component: DetailsRequestComponent },
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