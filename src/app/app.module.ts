import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { EmployeeService } from './employee.service';
import { AppComponent } from './app.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EmployeeDisputeComponent } from './employee-dispute/employee-dispute.component';
import { EmployeeLeaveComponent } from './employee-leave/employee-leave.component';
import { MenuLinkComponent } from './menu-link/menu-link.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    AddEmployeeComponent,
    EmployeeDisputeComponent,
    EmployeeLeaveComponent,
    MenuLinkComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: 'add-employee',
        pathMatch: 'full'
      },
      {
        path: 'add-employee',
        component: AddEmployeeComponent
      },
      {
        path: 'employee-dispute',
        component: EmployeeDisputeComponent
      },
      {
        path: 'employee-leave',
        component: EmployeeLeaveComponent
      }
    ])
  ],
  providers: [EmployeeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
