import { Injectable } from '@angular/core';
import { User } from '../../models/User';
import { Gift } from '../../models/Gift';
import { Lottery } from '../../models/Lottery';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable,map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LotteryService {
  constructor( private httpClient: HttpClient) { }
  private roaldLotterySubject:BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false);
  roaldLotteries$: Observable<boolean> =this.roaldLotterySubject.asObservable();
  LotteryList:Lottery[]=[];
  setLottery(){
    let flag = this.roaldLotterySubject.value;
    this.roaldLotterySubject .next(!flag);
   }

  addNewLottery(g :Gift,userLottery:User ) : Observable<Lottery>{
   
    let lottery = {
      giftId:g.giftId,
      userId:userLottery.userId,
      lotteryDate:new Date
     };
    let url = 'https://localhost:44304/api/Lottery/addLottery';
    return this.httpClient.post<Lottery>(url, lottery)
  
   }
  
   getLottery(): Observable<Lottery[]>{
    let url = "https://localhost:44304/api/Lottery/getAllLotteries";
    
    
    return  this.httpClient.get<Lottery[]>(url).pipe(map(l=>this.LotteryList=l));
  }
  
  }
 
