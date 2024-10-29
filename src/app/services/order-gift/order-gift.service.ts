import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable,map } from 'rxjs';
import { Cart } from 'src/app/models/Cart';
import { Gift } from 'src/app/models/Gift';
import { OrderGift } from 'src/app/models/orderGift';


@Injectable({
  providedIn: 'root'
})
export class OrderGiftService {


  constructor( private httpClient: HttpClient) { }
  private roaldOrdersGiftSubject:BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false);
  roaldOrdersGiftSubject$: Observable<boolean> =this.roaldOrdersGiftSubject.asObservable();
  orderGiftList:OrderGift[]=[];
  orderGiftUserList:OrderGift[]=[];
  setOrderGift(){
    let flag = this.roaldOrdersGiftSubject.value;
    this.roaldOrdersGiftSubject.next(!flag);
   }
  getOrdersGiftByuserId(userId:number): Observable<OrderGift[]>{
    let url = "https://localhost:44304/api/OrderGift/GetOrder?id="+userId;
    ;
    
    return  this.httpClient.get<OrderGift[]>(url).pipe(map(l=>this.orderGiftUserList=l));
  }
  getOrdersGift(): Observable<OrderGift[]>{
    let url = "https://localhost:44304/api/OrderGift";
    
    
    return  this.httpClient.get<OrderGift[]>(url).pipe(map(l=>this.orderGiftList=l));
  }
  addNewOrderGift(g :Gift,userId:number ) : Observable<number>{
   
    let orderGift = {
     giftId:g.giftId,
     userId:userId,
     orderGiftDate:new Date,
     orderGiftSum:g.ticketPrice,
    };
  
    let url = 'https://localhost:44304/api/OrderGift/addOrderGift';
    return this.httpClient.post<number>(url, orderGift)
  
   }
   deleteCart(Cart:Cart): Observable<number>{
    let url = 'https://localhost:44304/api/Cart/DeleteCart/' + Cart.cartId;
     return this.httpClient.delete<number>(url);
   }
}
