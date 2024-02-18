import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';


import { HomeComponent } from './home/home/home.component';
import { LoginComponent } from './auth/components/login/login.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { DashboardComponent } from './landlord/components/dashboard/dashboard.component';
import { ListRentDetailsComponent } from './landlord/components/list-rent-details/list-rent-details.component';
import { MyBookingsComponent } from './shared/components/my-bookings/my-bookings.component';
import { AddRent2Component } from './landlord/components/add-rent2/add-rent2.component';
import { EditRentComponent } from './landlord/components/edit-rent/edit-rent.component';
import { EditRent2Component } from './landlord/components/edit-rent2/edit-rent2.component';
import { EditUserComponent } from './shared/components/edit-user/edit-user.component';
import { ChangePasswordComponent } from './shared/components/change-password/change-password.component';




const routes: Routes = [

  {path:'home',component:HomeComponent},
  {path:'login',component:LoginComponent,pathMatch:'full'},
  {path:'register',component:RegisterComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'rent-details-list',component:ListRentDetailsComponent},
  {path:'rent-detail',component:ListRentDetailsComponent},
  {path:'my-bookings',component:MyBookingsComponent},
  {path:'addrent2',component:AddRent2Component},
  {path:'editrent2/:id',component: EditRent2Component},
  {path:'editUser/:id',component: EditUserComponent},
  {path:'changePassword',component: ChangePasswordComponent},






  {path: '**', redirectTo: 'home' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
