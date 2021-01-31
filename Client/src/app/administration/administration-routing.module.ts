import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListContactFormMessagesComponent } from '../contacts/list-contact-form-messages/list-contact-form-messages.component';
import { ListProfilesComponent } from '../profiles/list-profiles/list-profiles.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const administrationRoutes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'profiles', component: ListProfilesComponent },
    { path: 'messages', component: ListContactFormMessagesComponent },
]

@NgModule({
    imports: [
        RouterModule.forChild(administrationRoutes),
    ],
    exports: [
        RouterModule
    ]
})

export class AdministrationsRoutingModule { }