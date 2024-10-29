import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { OrderGift } from 'src/app/models/orderGift';
import { OrderGiftQ } from 'src/app/models/orderGiftQ';
import { OrderGiftService } from 'src/app/services/order-gift/order-gift.service';

@Component({
  selector: 'app-order-gift-client',
  templateUrl: './order-gift-client.component.html',
  styleUrls: ['./order-gift-client.component.css']
})
export class OrderGiftClientComponent {

  constructor(public orderGift: OrderGiftService, private router: Router) { }
  selectedIndex: number = 0;
  isNew: boolean = false;
  // gift:Gift=new Gift();gify
  orderGiftList: OrderGift[] = [];
  orderGiftListQ:OrderGiftQ[]=[]
    sum:number=0;
    
    ngOnInit() {
      const userJSON = localStorage.getItem('user');
      if (userJSON){
         const user: User = JSON.parse(userJSON);  

      this.orderGift.roaldOrdersGiftSubject$.subscribe(() => {
        this.orderGift.getOrdersGiftByuserId(user.userId).subscribe(data =>{ 
          
          if (data) { 
            this.orderGiftList = data// Check if data is not null or undefined
            this.transformArray(this.orderGiftList)

          }
        });
        

      });
    }
    else{

      this.router.navigate(['login']);
    }
   
 
  
  }
  transformArray(originalArray: OrderGift[])
  {
   this.orderGiftListQ=[];
 
   for (const cart of originalArray) {
     let found = false;
 
     for (const item of this.orderGiftListQ) {
       if (cart.gift.giftId === item.gift.giftId && cart.orderGiftDate === item.orderGiftDate ) {
         item.quantity++;
         found = true;
         break;
       }
     }
 
     if (!found) {
       this.orderGiftListQ.push({ orderGiftId:cart.orderGiftId,gift:cart.gift,user:cart.user,orderGiftDate:cart.orderGiftDate,quantity:1});
     }
   }

   console.log(this.orderGiftListQ)
 }
}
