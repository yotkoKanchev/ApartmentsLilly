import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ContactFormComponent } from "./contact-form/contact-form.component";
import { DetailsMessageComponent } from "./details-message/details-message.component";

const contactsRoutes: Routes = [
    { path: '', component: ContactFormComponent },
    { path: ':id', component: DetailsMessageComponent },
]

@NgModule({
    imports: [
        RouterModule.forChild(contactsRoutes),
    ],
    exports: [
        RouterModule,
    ]
})

export class ContactsRoutingModule { }