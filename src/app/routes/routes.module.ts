import { NgModule } from '@angular/core';
import { AppRoutingModule } from './routing.module';
import { SharedModule } from '../shared/shared.module';
import { ApiService } from './api.service';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { OrderListComponent } from './orderList/orderList.component';
import { OverListComponent } from './overList/overList.component';
import { OrderComponent } from './order/order.component';
import { OverComponent } from './over/over.component';

const COMPONENTS = [
  LoginComponent,
  HomeComponent,
  OrderListComponent,
  OverListComponent,
  OrderComponent,
  OverComponent
];

@NgModule({
  imports: [
    SharedModule,
    AppRoutingModule,
  ],
  declarations: [...COMPONENTS],
  providers: [ApiService],
  entryComponents: [
  ],
})
export class RoutesModule { }
