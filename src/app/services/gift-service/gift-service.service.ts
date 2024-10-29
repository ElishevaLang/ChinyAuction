import { Injectable } from '@angular/core';
import { BehaviorSubject,Observable ,map} from 'rxjs';
import { Gift } from '../../models/Gift';
import { HttpClient } from '@angular/common/http';
import { Donor } from '../../models/Donor';



@Injectable({
  providedIn: 'root'
})
export class GiftServiceService {

  constructor( private httpClient: HttpClient) { }

  giftList:Gift []=[];
  private roaldGiftSubject:BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false);
  roaldGifts$: Observable<boolean> =this.roaldGiftSubject.asObservable();
   
  getGifts(): Observable<Gift[]>{
    let url = 'https://localhost:44304/api/Gift/getAllData';
      //return null;
    return  this.httpClient.get<Gift[]>(url).pipe(map(l=>this.giftList=l));
  }

  
  setGetGift(){
    let flag = this.roaldGiftSubject.value;
    this.roaldGiftSubject.next(!flag);
   }


   addNewGift(g : Gift) : Observable<Gift>{
   
    let gift = {
     
      giftName :g.giftName,
      donorId:g.donorId,
      ticketPrice:g.ticketPrice,
      giftImg:g.giftImg
    };
    let url = 'https://localhost:44304/api/Gift/add';
    return this.httpClient.post<Gift>(url, gift)
  
   }
 
//  //===========================================

  updateGift(g : Gift):Observable<Gift>{
   let url = 'https://localhost:44304/api/Gift/update?GiftId='+g.giftId;
  return this.httpClient.put<Gift>(url, g)
 }
// //=================================================
deleteGift(g: Gift) :Observable<number>{
  let url = 'https://localhost:44304/api/Gift/DeleteGift/' + g.giftId;
   return this.httpClient.delete<number>(url);
 }
 getImageUrl(fileName: string): string {
  return `serviceOfAngularProject//Images//${fileName}`; // Adjust the URL as per your server implementation
}


}
