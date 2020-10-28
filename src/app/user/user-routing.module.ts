import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { SignupComponent } from './signup/signup.component';
import { EditProfileComponent}  from './edit-profile/edit-profile.component';
import { ViewProfileComponent} from './view-profile/view-profile.component';
import { ProfileListComponent} from './profile-list/profile-list.component';
import { ResetPasswordComponent} from './reset-password/reset-password.component';
import { SignupCanDeactivateGuard } from './signup-deactivate-guard.service';
import { LoginCanDeactivateGuard } from './login-deactivate-guard.service';
import { LoggedUserResolverService } from './logged-user-resolver.service';
import { AuthGuard } from './auth-guard.service';

const routes : Routes = [
 { path: 'welcome', component: WelcomeComponent},
 { path: 'signup', component: SignupComponent},
 { path: 'edit/:id', component: EditProfileComponent},
 { path: 'view/:id', component: ViewProfileComponent},
 { path: 'reset/:id', component: ResetPasswordComponent},
 { path: 'profiles', component: ProfileListComponent},
 { path: 'login', component: LoginComponent, canDeactivate: [LoginCanDeactivateGuard]},
 { path: 'signup', component: SignupComponent, canDeactivate: [SignupCanDeactivateGuard] },
 { path: 'welcome', component: WelcomeComponent, canActivate: [AuthGuard], resolve: { loggedUser: LoggedUserResolverService }}
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class UserRoutingModule {
    
}