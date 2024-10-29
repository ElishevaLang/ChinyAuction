import { Injectable } from '@angular/core';
import { BehaviorSubject,Observable ,map} from 'rxjs';
import { Donor } from '../../models/Donor';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DonorServiceService {

  constructor( private httpClient: HttpClient) { }
  donorList:Donor []=[];
  private roaldDonorSubject:BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false);
  roaldDonors$: Observable<boolean> =this.roaldDonorSubject.asObservable();

  getDonors(): Observable<Donor[]>{
    let url = 'https://localhost:44304/api/Donor/getAllData';
      //return null;
    return  this.httpClient.get<Donor[]>(url).pipe(map(l=>this.donorList=l));
  }

  
  setGetDonor(){
    let flag = this.roaldDonorSubject.value;
    this.roaldDonorSubject.next(!flag);
   }


   addNewDonor(g : Donor) : Observable<number>{
   
    let donor = {
      donorId   :g.donorId,
      donorFullName :g.donorFullName,
      donorPhonNum:g.donorPhonNum,
    
    };
    let url = 'https://localhost:44304/api/Donor/add';
    return this.httpClient.post<number>(url, donor)
  
   }
 
//  //===========================================

  updateDonor(g : Donor){
   let url = 'https://localhost:44304/api/Donor/update?DonorId='+g.donorId;
  return this.httpClient.put<number>(url, g)
 }
// //=================================================
deleteDonor(g: Donor){
  let url = 'https://localhost:44304/api/Donor/DeleteDonor/' + g.donorId;
   return this.httpClient.delete(url);
 }



}


