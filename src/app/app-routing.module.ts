import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GiftTableComponent } from './components/gift-table/gift-table.component';
import { MenuPageComponent } from './components/menu/menu.component';
import { PaymentPageComponent } from './components/payment-page/payment-page.component';
import { DonormanageMentComponent } from './components/donor-management/donor-management.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CartComponent } from './components/cart/cart.component';
import { OrderGiftManagementComponent } from './components/order-gift-management/order-gift-management.component';
import { OrderGiftClientComponent } from './components/order-gift-client/order-gift-client.component';
import { LotteryComponent } from './components/Lottery/lottery/lottery.component';
import { LotteryWinnersComponent } from './components/lottery-winners/lottery-winners.component';
import { AppComponent } from './app.component';

const routes: Routes = [
{ path: '', component: AppComponent },
{path:'giftTable',component:GiftTableComponent},
{path:'menu',component:MenuPageComponent},
{path:'payment/:sum',component:PaymentPageComponent},
{path:'don',component:DonormanageMentComponent},
{path:'login',component:LoginComponent},
{path:'register',component:RegisterComponent},
{path:'cart',component:CartComponent},
{path:'orderGiftManagement',component:OrderGiftManagementComponent},
{path:'OrderGiftClient',component:OrderGiftClientComponent},
{path:'Lottery',component:LotteryComponent},
{path:'LotteryWinners',component:LotteryWinnersComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
