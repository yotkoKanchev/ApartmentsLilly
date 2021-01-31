import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ContactFormComponent } from "./contact-form/contact-form.component";
import { ThankYouComponent } from "./thank-you/thank-you.component";

const contactsRoutes: Routes = [
    { path: '', component: ContactFormComponent },
    { path: ':id', component: ThankYouComponent },
    { path: 'thankYou', component: ThankYouComponent },
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