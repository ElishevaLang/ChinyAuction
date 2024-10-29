import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { User } from 'src/app/models/User';
import { OrderGift } from 'src/app/models/orderGift';
import { OrderGiftService } from 'src/app/services/order-gift/order-gift.service';

@Component({
  selector: 'app-order-gift-management',
  templateUrl: './order-gift-management.component.html',
  styleUrls: ['./order-gift-management.component.css']
})
export class OrderGiftManagementComponent {

  constructor(public orderGift: OrderGiftService, private router: Router) { }
  selectedIndex: number = 0;
  isNew: boolean = false;
  // gift:Gift=new Gift();gify
  orderGiftList: OrderGift[] = [];
    sum:number=0;
    
    ngOnInit() {
      const userJSON = localStorage.getItem('user');
      if (userJSON){
         const user: User = JSON.parse(userJSON);  
         if((user.email=="tehila055676@gmail.com")&&(user.password=="TLtl2121")){
      this.orderGift.roaldOrdersGiftSubject$.subscribe(() => {
        this.orderGift.getOrdersGift().subscribe(data =>{ 
          
          if (data) { 
            this.orderGiftList = data// Check if data is not null or undefined
            this.calculateSum();
          }
          

        });
        

      });
    }
    else{

      alert("אין לך הרשאה להכנס לדף הזה")

      this.router.navigate(['menu']);

    }
  
  
  }
    else{

      this.router.navigate(['login']);
    }
   
 
  
  }
  calculateSum(): void {
    this.sum = 0; // Initialize sum to 0
    console.log(this.orderGiftList)
    for (let i = 0; i < this.orderGiftList.length; i++) {
      console.log(this.orderGiftList[i])
      console.log(this.orderGiftList[i].gift)
      console.log(this.orderGiftList[i].gift.ticketPrice) 
      this.sum += this.orderGiftList[i].gift.ticketPrice;
      console.log(this.sum)
    }
  }

    pay(){

      this.router.navigate(['payment',this.sum])
    }
}
