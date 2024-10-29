import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable,map } from 'rxjs';
import { Cart } from 'src/app/models/Cart';
import { Gift } from 'src/app/models/Gift';

@Injectable({
  providedIn: 'root'
})
export class CartService {

 
  constructor( private httpClient: HttpClient) { }
  private roaldCartSubject:BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false);
  public roaldCarts$: Observable<boolean> =this.roaldCartSubject.asObservable();
  
  cartList:Cart[]=[];
  setCart(){
    let flag = this.roaldCartSubject.value;
    this.roaldCartSubject.next(!flag);
   }
  getCartsByuserId(userId:number): Observable<Cart[]>{
    let url = "https://localhost:44304/api/Cart/GetByUserId?id="+userId;
    
    return  this.httpClient.get<Cart[]>(url).pipe(map(l=>this.cartList=l));
  }
  addNewCart(g :Gift,userId:number ) : Observable<Cart>{
   
    let cart = {
     giftId:g.giftId,
     userId:userId
     };
    let url = 'https://localhost:44304/api/Cart/addCart';
    return this.httpClient.post<Cart>(url, cart)
  
   }
   deleteCart(Cart:Cart): Observable<number>{
    let url = 'https://localhost:44304/api/Cart/DeleteCart/' + Cart.cartId;
     return this.httpClient.delete<number>(url);
   }
 
}
