import { Component ,OnInit} from '@angular/core';
import { CartService } from 'src/app/services/cart-sevice/cart.service';

import { Cart } from 'src/app/models/Cart';
import { User } from 'src/app/models/User';
import { Router } from '@angular/router';
import { OrderGiftService } from './services/order-gift/order-gift.service';
import { OrderGift } from './models/orderGift';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
constructor(public cartService: CartService,private router: Router,public orderGift:OrderGiftService) { }
  management:boolean=false
  cartList:Cart[]=[];
  orderGiftList:OrderGift[]=[];
  countOrderGift:number=0
  autoplayInterval: number = 4000;
  user:User=new User()
  countdown:string=""
  title = 'ChinySale';
  count:number=0;
  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 3
    },
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 2
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1
    }
  ];

  ngOnInit() {
    this.router.navigate(['login']);

    const targetDate = new Date(Date.now() + 10 * 24 * 60 * 60 * 1000 + 20 * 60 * 60 * 1000 + 25 * 60 * 1000 + 15 * 1000);
   
    const countdownInterval = setInterval(() => {
      const currentDate = new Date();
      const remainingTime = targetDate.getTime() - currentDate.getTime();

      if (remainingTime <= 0) {
        this.countdown = 'Time is up!';
        clearInterval(countdownInterval);
        alert('Time is up!');
      } else {
        const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
        const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

        this.countdown = `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`;
      }
    }, 1000);


    const userJSON = localStorage.getItem('user');
    this.management=false

    if (userJSON){
      this.user= JSON.parse(userJSON);  
       
          if((this.user.email=="tehila055676@gmail.com")&&(this.user.password=="TLtl2121")){
                  this.management=true

          }
          else{
               this.management=false


          }
          this.cartService.roaldCarts$.subscribe(x => {
            this.cartService.getCartsByuserId(this.user.userId).subscribe(data =>{ 
          
        if (data) { 
          this.cartList = data// Check if data is not null or undefined
          this.count = this.cartList.length;    
            }
      });
    });
    this.orderGift.roaldOrdersGiftSubject$.subscribe(() => {
      this.orderGift.getOrdersGiftByuserId(this.user.userId).subscribe(data =>{ 
        
        if (data) { 
          this.orderGiftList = data// Check if data is not null or undefined
          this.countOrderGift=this.orderGiftList.length

        }
      });
  })}

}

  
 
}
