import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { OrderListComponent } from './orderList/orderList.component';
import { OverListComponent } from './overList/overList.component';
import { OrderComponent } from './order/order.component';
import { OverComponent } from './over/over.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home',
    children: [
      { path: '', redirectTo: 'orderlist', pathMatch: 'full' },
      { path: 'orderlist', component: HomeComponent,
        children: [
          { path: '', redirectTo: '0', pathMatch: 'full' },
          {path: ':id', component: OrderListComponent }
        ]
      },
      { path: 'overlist', component: HomeComponent,
        children: [
          { path: '', redirectTo: '0', pathMatch: 'full' },
          {path: ':id', component: OverListComponent }
        ]
      },
    ]
  },
  { path: 'order', component: OrderComponent },
  { path: 'over', component: OverComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
