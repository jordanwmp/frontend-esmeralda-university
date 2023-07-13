import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AdminProfileComponent } from './admin/admin-profile/admin-profile.component';
import { AuthGuard } from './guard/auth.guard';
import { RegisterAdminComponent } from './admin/register-admin/register-admin.component';
import { SigninComponent } from './admin/signin/signin.component';

const routes: Routes = [
  {path: '', redirectTo: 'admin-login', pathMatch: 'full'},
  {path: 'signup-admin', component: RegisterAdminComponent},
  {path: 'admin-login', component: SigninComponent},
  {path: 'admin-profile', component: AdminProfileComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
