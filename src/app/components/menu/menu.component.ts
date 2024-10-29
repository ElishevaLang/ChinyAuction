import { ConfirmationService, MessageService } from 'primeng/api';
import { Component } from '@angular/core';
import { Gift } from 'src/app/models/Gift';
import { GiftServiceService } from 'src/app/services/gift-service/gift-service.service';
import { CartService } from 'src/app/services/cart-sevice/cart.service';
import { User } from 'src/app/models/User';
import { Router } from '@angular/router';
import {ToastModule} from 'primeng/toast';
import { Messages } from 'primeng/messages';



@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class MenuPageComponent {
  constructor( public giftService:GiftServiceService,public cartService : CartService, private messageService: MessageService, private confirmationService: ConfirmationService,private router: Router) { }
// ------------------------------------------------------------------------------------------
  giftList: Gift[] = [];
  selectedIndex: number = 0;
  isNew: boolean = false;
// ------------------------------------------------------------------------------------------

  ngOnInit() {
    this.giftService.roaldGifts$.subscribe(x => {
      this.giftService.getGifts().subscribe(data => this.giftList = data);
    });
  }
// ------------------------------------------------------------------------------------------
  addCart(gift:Gift){
  const userJSON = localStorage.getItem('user');
  if (userJSON){
     const user: User = JSON.parse(userJSON);  
     this.cartService.addNewCart(gift,user.userId).subscribe(res => {
      if (res) {
        this.cartService.setCart()
        this.messageService.add({ severity: 'success', summary:` נוסף בהצלחה ${gift.giftName}` , detail: ' ' });
  }})
  }
  else{
    this.router.navigate(['login']);
  }
  }
 
}
// ------------------------------------------------------------------------------------------
