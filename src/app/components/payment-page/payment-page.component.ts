import { UserServiceService } from 'src/app/services/user-service/user-service.service';
import { Component ,Input,Output,EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Payment } from 'src/app/models/Payment';
import { ActivatedRoute } from '@angular/router';
import { OrderGiftService } from 'src/app/services/order-gift/order-gift.service';
import { User } from 'src/app/models/User';
import { Cart } from 'src/app/models/Cart';
import { CartService } from 'src/app/services/cart-sevice/cart.service';
import { Gift } from 'src/app/models/Gift';
import { CalendarModule } from 'primeng/calendar';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
// import { Location } from '@angular/common';


// import { creditCardValidator } from 'src/app/validators/CreditCardValid';
// ,creditCardValidator()
// import { dateValidator } from 'src/app/validators/DateValidator';
// dateValidator()

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.css']
})
export class PaymentPageComponent  {
  frmPayment: FormGroup = new FormGroup({}); 

constructor(public orderGiftService:OrderGiftService,public cartService:CartService, private router: Router,private route: ActivatedRoute) {
  this.frmPayment = new FormGroup({
    creditCardNumber: new FormControl('', [Validators.required,Validators.pattern('[0-9]{16}')]),
    passwordReexpiryDategister: new FormControl('',[Validators.required]),
    cvv: new FormControl('',[Validators.required,Validators.pattern('[0-9]{3}')]),
  })
}


cartList:Cart[]=[];
cartListToDelete:Cart[]=[];
payment:Payment=new Payment();
sumParameter:number=0;
isDialog:boolean=true;
finish:boolean=false
orderFinish:boolean=true;
user:User=new User()
ngOnInit(): void {
  this.route.params.subscribe(params => {
    this.sumParameter = params['sum'];
  })};

  pay() {
    const userJSON = localStorage.getItem('user');
    if (userJSON){
       this.user= JSON.parse(userJSON);  
       this.finish=true
       this.orderFinish=false

    this.cartService.roaldCarts$.subscribe(x => {
      this.cartService.getCartsByuserId(this.user.userId).subscribe(data =>{ 
         if (data) { 
          this.cartList = data
          this.cartList.forEach(x=>{
                  this.order(x.gift,this.user.userId)
          },
          setTimeout(()=>{this.orderFinish=true;;
        },2000) 

          )
        
        
        }

         });
      });
  }
else{

  this.router.navigate(['login']);
}
  
  }
  order(gift:Gift,userId:number){

    this.orderGiftService.addNewOrderGift(gift ,userId )    
     .subscribe(res => {
      if (res) {
        this.orderGiftService.setOrderGift()
     
  }})
  }
closeDaialog(){

this.isDialog=false

this.finish=false
this.deleteAllCart(this.user.userId);

  }

  close(){
    this.orderFinish=true
  }
  deleteAllCart(userId:number){
    this.cartService.roaldCarts$.subscribe(x => {
      this.cartService.getCartsByuserId(userId).subscribe(data =>{ 
        if (data) 
       { 
          this.cartListToDelete = data
          this.cartListToDelete.forEach(x=>{
          this.cartService.deleteCart(x).subscribe(res =>
        {
              if (res) {
                this.cartService.setCart();
                this.router.navigate(["menu"])

              }
        })
          })
        }
      });
    });
  }
  }
