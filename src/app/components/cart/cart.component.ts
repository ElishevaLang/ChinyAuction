import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CartService } from 'src/app/services/cart-sevice/cart.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cart } from 'src/app/models/Cart';
import { User } from 'src/app/models/User';
import { Router } from '@angular/router';
import { CartQ } from 'src/app/models/CartQ';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class CartComponent {
  constructor(public cartService: CartService, private messageService: MessageService, private confirmationService: ConfirmationService,private router: Router) { }
// ------------------------------------------------------------------------------------------
  selectedIndex: number = 0;
  isNew: boolean = false;
  cartList: Cart[] = [];
  cartToDelete:Cart=new Cart;
  cartListQ:CartQ[]=[];
  sum:number=0;
  
// ------------------------------------------------------------------------------------------
ngOnInit() {
      const userJSON = localStorage.getItem('user');
      if (userJSON){
         const user: User = JSON.parse(userJSON);  
      this.cartService.roaldCarts$.subscribe(x => {
        this.cartService.getCartsByuserId(user.userId).subscribe(data =>{ 
          
          if (data) { 
            this.cartList = data
            console.log(this.cartList)
            this.transformArray(this.cartList)
            this.calculateSum();
          }
        });
      });
    }
  else{

    this.router.navigate(['login']);
  }
  }
// ------------------------------------------------------------------------------------------
calculateSum(): void {
    this.sum = 0; // Initialize sum to 0
    console.log(this.cartList)
    for (let i = 0; i < this.cartList.length; i++) {
      this.sum += this.cartList[i].gift.ticketPrice;
    }
  }
  transformArray(originalArray: Cart[])
   {
    this.cartListQ=[];
  
    for (const cart of originalArray) {
      let found = false;
  
      for (const item of this.cartListQ) {
        if (cart.gift.giftId === item.gift.giftId) {
          item.quantity++;
          found = true;
          break;
        }
      }
  
      if (!found) {
        this.cartListQ.push({ cartId:cart.cartId,gift:cart.gift,quantity:1});
      }
    }
    console.log(this.cartListQ)
  }
  
  
  
// ------------------------------------------------------------------------------------------
    deleteCart(cart: CartQ): void {
     const index= this.cartList.findIndex(x=>x.gift.giftId===cart.gift.giftId) 
     this.cartToDelete=this.cartList[index];
      this.cartService.deleteCart(this.cartToDelete).subscribe(res => {
        if (res) {
          this.cartService.setCart()
         
        }
  
      })
    }
// ------------------------------------------------------------------------------------------
    pay(){

      this.router.navigate(['payment',this.sum])
    }
// ------------------------------------------------------------------------------------------

}
