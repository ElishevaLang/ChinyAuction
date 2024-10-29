import { ConfirmationService, MessageService } from 'primeng/api';
import { Component } from '@angular/core';
import { GiftServiceService } from 'src/app/services/gift-service/gift-service.service'
import { Gift } from 'src/app/models/Gift';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from 'src/app/models/User';
import { Route, Router } from '@angular/router';
import { Observable, map } from 'rxjs';


@Component({
  selector: 'app-gift-table',
  templateUrl: './gift-table.component.html',
  styleUrls: ['./gift-table.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class GiftTableComponent {
 
  constructor(public giftService: GiftServiceService, private messageService: MessageService, private confirmationService: ConfirmationService,private router: Router,private http: HttpClient) { }

// ------------------------------------------------------------------------------------------
   imageUrl: string | null = null;

  selectedIndex: number = 0;
  isNew: boolean = false;
  giftList: Gift[] = [];
  user:User=new User()
// ------------------------------------------------------------------------------------------

    ngOnInit() {
      const userJSON = localStorage.getItem('user');
      if (userJSON){
         const user: User = JSON.parse(userJSON);  
      if((user.email=="tehila055676@gmail.com")&&(user.password=="TLtl2121")){
      this.giftService.roaldGifts$.subscribe(x => {
        this.giftService.getGifts().subscribe(data => this.giftList = data);
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

  deleteGift(gift: Gift): void {
    this.giftService.deleteGift(gift).subscribe((res) => {
      if (res) {
        this.giftService.setGetGift()
      }
      else{

        this.messageService.add({ severity: 'warn', summary: 'לא ניתן למחוק מתנה זו מתנה זו מקושרת עם דפים אחרים', detail: '' })

        }
    },
    (error: HttpErrorResponse) => {
      if (error.status === 500) {
        this.messageService.add({ severity: 'warn', summary: 'לא ניתן למחוק מתנה זו מתנה זו מקושרת עם דפים אחרים', detail: '' })
   
      } else {
        this.messageService.add({ severity: 'warn', summary: 'לא ניתן למחוק מתנה זו מתנה זו מקושרת עם דפים אחרים', detail: '' })
      }
     
    })
  }
// ------------------------------------------------------------------------------------------
  addGift(newGift: Gift) {
    this.giftService.addNewGift(newGift).subscribe(res => {
      if (res) {
        this.giftService.setGetGift()
        this.isNew = false;
      }

    })
  }
  loadImage(imageFileName: string) {
    this.imageUrl = this.giftService.getImageUrl(imageFileName);
  }
  fetchImage(imageName: string): Observable<string> {
    return this.http.get(`https://localhost:44304/api/Images/${imageName}`, { responseType: 'blob' })
      .pipe(
        map((response: Blob) => {
          const imageUrl = URL.createObjectURL(response);
          return imageUrl;
        })
      );
  }
}