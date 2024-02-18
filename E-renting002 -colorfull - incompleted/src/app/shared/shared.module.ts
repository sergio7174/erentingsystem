import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { MyBookingsComponent } from './components/my-bookings/my-bookings.component';
import { CoreModule } from '../core/core.module';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';





@NgModule({
  declarations: [
    MyBookingsComponent,
    EditUserComponent,
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,


  ],
  exports: [
    MyBookingsComponent,
    EditUserComponent,
    ChangePasswordComponent,
  ]
})
export class SharedModule { }
