import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AddRentComponent } from './components/add-rent/add-rent.component';
import { AllotmentdetailsComponent } from './components/allotmentdetails/allotmentdetails.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EditRentComponent } from './components/edit-rent/edit-rent.component';
import { ListRentDetailsComponent } from './components/list-rent-details/list-rent-details.component';
import { MonthlybookingComponent } from './components/monthlybooking/monthlybooking.component';
import { NotificationdetailsComponent } from './components/notificationdetails/notificationdetails.component';
import { RoomdetailsComponent } from './components/roomdetails/roomdetails.component';
import { MatTableModule } from '@angular/material'
import { MatFormFieldModule } from '@angular/material/form-field';


import { CoreModule } from '../core/core.module';
import {MatCardModule} from '@angular/material/card';
import { Router } from '@angular/router';
import { AddRent2Component } from './components/add-rent2/add-rent2.component';

import { EditRent2Component } from './components/edit-rent2/edit-rent2.component';


@NgModule({
  declarations: [
    AddRentComponent,
    AllotmentdetailsComponent,
    DashboardComponent,
    EditRentComponent,
    ListRentDetailsComponent,
    MonthlybookingComponent,
    NotificationdetailsComponent,
    RoomdetailsComponent,
    AddRent2Component,
    EditRent2Component,

  ],
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    HttpClientModule,
    MatCardModule,
    MatTableModule,
    MatFormFieldModule,
    ReactiveFormsModule,



  ],
  exports: [
    AddRentComponent,
    AllotmentdetailsComponent,
    DashboardComponent,
    EditRentComponent,
    ListRentDetailsComponent,
    MonthlybookingComponent,
    NotificationdetailsComponent,
    RoomdetailsComponent,
    MatCardModule,
    MatTableModule,
    MatFormFieldModule,
    AddRent2Component,
    EditRent2Component,



  ]
})
export class LandlordModule { }
