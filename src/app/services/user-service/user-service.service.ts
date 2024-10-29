import { Injectable } from '@angular/core';
import { BehaviorSubject,Observable ,map} from 'rxjs';
import { User } from 'src/app/models/User';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor( private httpClient: HttpClient) { }
  userList:User []=[];
  private roaldUserSubject:BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false);
  roaldUsers$: Observable<boolean> =this.roaldUserSubject.asObservable();
  setUser(){
    let flag = this.roaldUserSubject.value;
    this.roaldUserSubject.next(!flag);
   }
  getUsers(): Observable<User[]>{
    let url = 'https://localhost:44304/api/User/getAllData';
      //return null;
    return  this.httpClient.get<User[]>(url).pipe(map(l=>this.userList=l));
  }
  addNewUser(u : User) : Observable<User>{
   
    let user = {
     
      
      email:u.email,
      password:u.password,
      firstName:u.firstName,
      lastName:u.lastName
    };
    let url = 'https://localhost:44304/api/User/addUser';
    return this.httpClient.post<User>(url, user)
  
   }
   getUsersByEmailAndPassword(email:string,password:string): Observable<User[]>{
    let url = 'https://localhost:44304/api/User/login?email='+email+'&password='+password;
    
      //return null;
    return  this.httpClient.get<User[]>(url);
  }
 
//  //===========================================



}
