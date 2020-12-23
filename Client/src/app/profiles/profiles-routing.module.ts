import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ProfileComponent } from './profile/profile.component';

const profilesRoutes: Routes = [
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: 'mine', component: ProfileComponent },
    { path: 'update', component: EditProfileComponent },
    { path: 'change-password', component: ChangePasswordComponent },
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