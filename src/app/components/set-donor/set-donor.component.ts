import { PriceValidator } from 'src/app/validators/PriceValidator';
import { Component ,Input,Output,EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Donor } from 'src/app/models/Donor';
import { DonorServiceService } from 'src/app/services/donor-server/donor-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-set-donor',
  templateUrl: './set-donor.component.html',
  styleUrls: ['./set-donor.component.css'],
  providers: [ConfirmationService, MessageService]

})
export class SetDonorComponent implements OnChanges{

 
  copyDonor: Donor = new Donor();
  frmDonor: FormGroup = new FormGroup({});
 
  @Input()
  donorList:Donor []=[];
  @Input()
  isNew: Boolean = false
  @Input()
  donor: Donor = new Donor();
  @Output()
  donorChange: EventEmitter<Donor> = new EventEmitter<Donor>();
  @Output()
  addDonor: EventEmitter<Donor> = new EventEmitter<Donor>();
  @Input()
  openText:string=""
  @Input()
  isDialog:boolean=false;
  constructor(public donorService: DonorServiceService,private messageService: MessageService, private confirmationService: ConfirmationService) {
    this.frmDonor = new FormGroup({
      donorFullName: new FormControl('', [Validators.required]),
      donorPhonNum: new FormControl(0,[Validators.required,  Validators.pattern('[0-9]{10}')]
    ),
    });
  
    this.copyDonor = new Donor();
  }
  ngOnChanges(changes: SimpleChanges): void
   {
    this.copyDonor = new Donor();
    this.copyDonor = Object.assign(new Donor(), this.donor);
  }
  saveandclose() {
    let g: Donor = new Donor();
    let flag=this.validation_Name(this.donor.donorFullName);
    Object.assign(g, this.donor);
   
    if (this.isNew &&!flag) {

      this.addDonor.emit(g);
      
    }
    else {
      this.donorChange.emit(this.donor);
      this.donorService.updateDonor(g).subscribe((res) => {
        if (res) {
          this.donorService.setGetDonor()
      
        }
        else{

          this.messageService.add({ severity: 'warn', summary: 'לא ניתן לעדכן מתנה זו מתנה זו מקושרת עם דפים אחרים', detail: 'Toast message' })
  
          }
  
      },
      (error: HttpErrorResponse) => {
        if (error.status === 500) {
          this.messageService.add({ severity: 'warn', summary: 'לא ניתן לעדכן מתנה זו מתנה זו מקושרת עם דפים אחרים', detail: '' })
     
        } else {
          this.messageService.add({ severity: 'warn', summary: 'Warning', detail: '' });
        }
      }
      )
      
    }
 
    this.closeModal();
  
 
  }

  closeModal() {
    // var modal = document.getElementById("myModal");
    // if (modal)
    //   modal.style.display = "none";
    this.isDialog=false
  }

  //cancel
  undoandclose() {
    Object.assign(this.donor, this.copyDonor);
    this.closeModal();
  }
  validation_Name(name:string){
 let nameDouble= this.donorList.find(item=>item.donorFullName==name)
 if(nameDouble){
    return true;
 }
 return false;
}

}

