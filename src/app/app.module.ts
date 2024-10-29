import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CascadeSelectModule } from 'primeng/cascadeselect';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GiftTableComponent } from './components/gift-table/gift-table.component';
import { ModalComponent } from './components/modal/modal.component';
import { SetGiftComponent } from './components/set-gift/set-gift.component';
import{ ReactiveFormsModule }  from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmationService } from 'primeng/api';
import { CalendarModule } from 'primeng/calendar';
import { FileUploadModule } from 'primeng/fileupload';
import { PaginatorModule } from 'primeng/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { DonormanageMentComponent } from './components/donor-management/donor-management.component';
import { MenuPageComponent } from './components/menu/menu.component';
import { PaymentPageComponent } from './components/payment-page/payment-page.component';
import { SetDonorComponent } from './components/set-donor/set-donor.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CartComponent } from './components/cart/cart.component';
import { OrderGiftManagementComponent } from './components/order-gift-management/order-gift-management.component';
import { OrderGiftClientComponent } from './components/order-gift-client/order-gift-client.component';
import {ToastModule} from 'primeng/toast';

import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { LotteryComponent } from './components/Lottery/lottery/lottery.component';
import { LotteryWinnersComponent } from './components/lottery-winners/lottery-winners.component';
import { PasswordModule } from 'primeng/password';

import { PrimeIcons, MenuItem } from 'primeng/api';



@NgModule({
  declarations: [
    AppComponent,
    GiftTableComponent,
    ModalComponent,
    SetGiftComponent,
    DonormanageMentComponent,
    MenuPageComponent,
   PaymentPageComponent,
   SetDonorComponent,
   LoginComponent,
   RegisterComponent,
   CartComponent,
   OrderGiftManagementComponent,
   OrderGiftClientComponent,
   LotteryComponent,
   LotteryWinnersComponent,


    
  ],
  imports: [
    HttpClientModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    TableModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
    InputNumberModule,
    DialogModule,
    ConfirmDialogModule,
    DropdownModule,
    RadioButtonModule,
    RatingModule,
    ToolbarModule,
    CalendarModule,
    FileUploadModule,
    PaginatorModule,
    CascadeSelectModule,
    CalendarModule,
    ProgressSpinnerModule,
    ToastModule,
    PasswordModule
   
  ],
  //        BrowserModule,


  providers: [ConfirmationService  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
