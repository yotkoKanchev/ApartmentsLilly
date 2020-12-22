import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

const profilesRoutes: Routes = [
    { path: 'forgot-password', component: ForgotPasswordComponent },
]

@NgModule({
    imports: [
        RouterModule.forChild(profilesRoutes),
    ],
    exports: [
        RouterModule
    ]
})

export class ProfilesRoutingModule { }