import { ConfirmationService, MessageService } from 'primeng/api';
import { Component } from '@angular/core';
import { Donor } from 'src/app/models/Donor';
import { DonorServiceService } from 'src/app/services/donor-server/donor-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from 'src/app/models/User';
import { Router } from '@angular/router';


@Component({
  selector: 'app-donor-management',
  templateUrl: './donor-management.component.html',
  styleUrls: ['./donor-management.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class DonormanageMentComponent {
// ------------------------------------------------------------------------------------------

  constructor(public donorService: DonorServiceService, private messageService: MessageService, private confirmationService: ConfirmationService,private router:Router) { }

// ------------------------------------------------------------------------------------------
  selectedIndex: number = 0;
  isNew: boolean = false;
  donorList: Donor[] = [];
// ------------------------------------------------------------------------------------------

  ngOnInit() {
    const userJSON = localStorage.getItem('user');
    if (userJSON){
       const user: User = JSON.parse(userJSON);  
    if((user.email=="tehila055676@gmail.com")&&(user.password=="TLtl2121")){
    this.donorService.roaldDonors$.subscribe(x => {
      this.donorService.getDonors().subscribe(data => this.donorList = data);
    })}
    else{
      alert("אין לך הרשאה להכנס לדף הזה")

      this.router.navigate(['menu']);
    }}
    else{
      this.router.navigate(['login']);
    }
    
  }
// ------------------------------------------------------------------------------------------
  deleteDonor(donor: Donor): void {
    this.donorService.deleteDonor(donor).subscribe(
      (res) => {
        if (res) {
          this.donorService.setGetDonor();
        } else {
          this.messageService.add({ severity: 'warn', summary: 'לא ניתן לעדכן מתנה זו מתנה זו מקושרת עם דפים אחרים', detail: '' })
        }
      },
      (error: HttpErrorResponse) => {
        if (error.status === 500) {
          this.messageService.add({ severity: 'warn', summary: 'לא ניתן למחוק מתנה זו מתנה זו מקושרת עם דפים אחרים', detail: '' })
     
        } else {
          this.messageService.add({ severity: 'warn', summary: 'לא ניתן למחוק מתנה זו מתנה זו מקושרת עם דפים אחרים', detail: '' })
        }
      }
    );
  }
// ------------------------------------------------------------------------------------------
  addDonor(newDonor: Donor) {

    this.donorService.addNewDonor(newDonor).subscribe(res => {
      if (res) {
        this.donorService.setGetDonor()
        this.isNew = false;
      }

    })
  }

}







