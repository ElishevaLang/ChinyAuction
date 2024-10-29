import { ConfirmationService, MessageService } from 'primeng/api';
import { Component } from '@angular/core';
import { GiftServiceService } from 'src/app/services/gift-service/gift-service.service'
import { Gift } from 'src/app/models/Gift';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from 'src/app/models/User';
import { Route, Router } from '@angular/router';
import { OrderGift } from 'src/app/models/orderGift';
import { OrderGiftService } from 'src/app/services/order-gift/order-gift.service';
import { LotteryService } from 'src/app/services/lottery-service/lottery.service';
import { Lottery } from 'src/app/models/Lottery';

@Component({
  selector: 'app-lottery',
  templateUrl: './lottery.component.html',
  styleUrls: ['./lottery.component.css']
})
export class LotteryComponent {

// ------------------------------------------------------------------------------------------

constructor(public giftService: GiftServiceService,public orderGift:OrderGiftService,private router: Router,public lotterySrevice:LotteryService) { }
// ------------------------------------------------------------------------------------------

spinner:boolean=false
spinner2:boolean=false
show:boolean=false
noWinner:boolean=false
selectedIndex: number = 0;
giftList: Gift[] = [];
user:User=new User()
userWinnerObject:User=new User();
userWinner:string=""
allLotterirss:Lottery[]=[];
orderGiftList:OrderGift[]=[];
userLottery:OrderGift[]=[];
lottery:number=-2;
// ------------------------------------------------------------------------------------------

    ngOnInit() {
      const userJSON = localStorage.getItem('user');
      if (userJSON){
         this. user= JSON.parse(userJSON);  
         
      if((this.user.email=="tehila055676@gmail.com")&&(this.user.password=="TLtl2121")){
      this.giftService.roaldGifts$.subscribe(x => {
        this.giftService.getGifts().subscribe(data => this.giftList = data);
        this.orderGift.getOrdersGift().subscribe(data =>{ 
          
          if (data) { 
            this.orderGiftList = data// Check if data is not null or undefined
          }
          

        });
      });}
      else{

        alert("אין לך הרשאה להכנס לדף הזה")

        this.router.navigate(['menu']);
      }}
      else{

        this.router.navigate(['login']);

      }
    }
// ------------------------------------------------------------------------------------------
random(gift: Gift): void {
 
  this.lotterySrevice.roaldLotteries$.subscribe(x => {
    this.lotterySrevice.getLottery().subscribe(res => {if(res){{this.allLotterirss=res
      if(this.allLotterirss.length>0){
     this.lottery=this.allLotterirss.findIndex(x=>x.gift.giftId==gift.giftId);
    console.log(this.lottery)
      }
    }}}
      )
    })
if(this.lottery==-1||this.lottery==-2){
   this.show=true
  this.spinner=true;
  this.userLottery=this.orderGiftList.filter(o=>o.gift.giftId==gift.giftId)
  if(this.userLottery.length!=0){
          let randomIndex = Math.floor(Math.random() * this.userLottery.length);
          this. userWinnerObject=this.userLottery[randomIndex].user ;
          this.userWinner=this.userWinnerObject.firstName+" "+this.userWinnerObject.lastName + " won on a "+ gift.giftName;
          this.addLottery(gift,this. userWinnerObject);
          setTimeout(()=>{this.spinner=false; this.spinner2=true },2000) 
}
  else{
      setTimeout(()=>{this.spinner=false;this.noWinner=true},2000) 
      }}
  }
// ------------------------------------------------------------------------------------------
  close(){
  this.spinner2=false;
    this.show=false;
    this.userWinner="";
    this.noWinner=false
  }
// ------------------------------------------------------------------------------------------

  addLottery(gift:Gift,userWinner:User){
   

       this.lotterySrevice.addNewLottery(gift,userWinner).subscribe(res => {
        if (res) {
          this.lotterySrevice.setLottery()
   } })

}
allLotteries(){
this.router.navigate(['LotteryWinners'])

}
}

// ------------------------------------------------------------------------------------------
