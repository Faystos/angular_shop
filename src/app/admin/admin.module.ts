import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';


import { AdminLayoutComponent } from './shared/admin-layout/admin-layout.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { AddProductPageComponent } from './add-product-page/add-product-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { OrdersPageComponent } from './orders-page/orders-page.component';
import { AuthGuard } from "../shared/auth.guard";

@NgModule({
  declarations: [
    AdminLayoutComponent,
    LoginPageComponent,
    DashboardPageComponent,
    AddProductPageComponent,
    EditPageComponent,
    OrdersPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule.forRoot(),
    RouterModule.forChild([
      {
        path: '', component: AdminLayoutComponent, children: [
          {
            path: '', redirectTo: '/admin/login', pathMatch: 'full'
          },
          {
            path: 'login', component: LoginPageComponent
          },
          {
            path: 'dashboard', component: DashboardPageComponent, canActivate: [AuthGuard]
          },
          {
            path: 'add', component: AddProductPageComponent, canActivate: [AuthGuard]
          },
          {
            path: 'product/:id/edit', component: EditPageComponent, canActivate: [AuthGuard]
          },
          {
            path: 'orders', component: OrdersPageComponent, canActivate: [AuthGuard]
          },
        ]
      }
    ])
  ],
  exports: [
    RouterModule
  ]
})

export class AdminModule {}
