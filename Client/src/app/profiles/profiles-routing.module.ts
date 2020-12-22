import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ProfileComponent } from './profile/profile.component';

const profilesRoutes: Routes = [
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: 'mine', component: ProfileComponent },
    { path: 'edit', component: ProfileComponent },
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