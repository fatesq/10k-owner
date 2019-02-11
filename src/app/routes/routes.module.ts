import { NgModule } from '@angular/core';
import { AppRoutingModule } from './routing.module';
import { SharedModule } from '../shared/shared.module';
import { ApiService } from './api.service';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { OrderListComponent } from './orderList/orderList.component';

const COMPONENTS = [
  LoginComponent,
  HomeComponent,
  OrderListComponent,
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
