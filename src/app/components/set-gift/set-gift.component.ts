import { PriceValidator } from 'src/app/validators/PriceValidator';
import { Component ,Input,Output,EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Gift } from 'src/app/models/Gift';
import { GiftServiceService } from 'src/app/services/gift-service/gift-service.service';
import { DonorServiceService } from 'src/app/services/donor-server/donor-service.service';
import { Donor } from 'src/app/models/Donor';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-set-gift',
  templateUrl: './set-gift.component.html',
  styleUrls: ['./set-gift.component.css'],
  providers: [ConfirmationService, MessageService]

})
export class SetGiftComponent implements OnChanges  {

  copyGift: Gift = new Gift();
  frmGift: FormGroup = new FormGroup({});
  @Input()
  giftList:Gift []=[];
  @Input()
  isNew: Boolean = false
  @Input()
  gift: Gift = new Gift();
  @Output()
  giftChange: EventEmitter<Gift> = new EventEmitter<Gift>();
  @Output()
  addGift: EventEmitter<Gift> = new EventEmitter<Gift>();
  @Input()
  openText:string=""
  @Input()
  isDialog:boolean=false;

  constructor(public giftService: GiftServiceService,public donorService:DonorServiceService,private messageService: MessageService, private confirmationService: ConfirmationService, private http: HttpClient) {
    this.frmGift = new FormGroup({
      giftName: new FormControl('', [Validators.required]),
      donorId: new FormControl('', [Validators.required]),
      ticketPrice: new FormControl(0,[Validators.required,PriceValidator(10)]),
      giftImg:new FormControl('',[Validators.required])
    })
  }

  donorList:Donor[]=[];
  ngOnInit() {
    this.donorService.roaldDonors$.subscribe(x => {
      this.donorService.getDonors().subscribe(data => this.donorList = data);
    });
  }

  ngOnChanges(changes: SimpleChanges): void
   {
    this.copyGift = new Gift();
    this.copyGift = Object.assign(new Gift(), this.gift);
  }

  saveandclose() {
    let g: Gift = new Gift();
    let flag=this.validation_Name(this.gift.giftName);
    Object.assign(g, this.gift);
   
    if (this.isNew &&!flag) {

      this.addGift.emit(g);
      
    }
    else {
      this.giftChange.emit(this.gift);
      this.giftService.updateGift(g).subscribe((res) => {
        if (res)
        {
          this.giftService.setGetGift()
      
        }
        else
        {

          this.messageService.add({ severity: 'warn', summary: 'לא ניתן לעדכן מתנה זו מתנה זו מקושרת עם דפים אחרים', detail: '' })

        }
      },
      (error: HttpErrorResponse) => {
        if (error.status === 500) {
          this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Toast message' });

          this.messageService.add({ severity: 'warn', summary: 'לא ניתן לעדכן מתנה זו מתנה זו מקושרת עם דפים אחרים', detail: '' })
     
        } else {
          this.messageService.add({ severity: 'warn', summary: 'לא ניתן לעדכן מתנה זו מתנה זו מקושרת עם דפים אחרים', detail: '' })
        }
      }
      )
      
    }
 
    this.closeModal();
  
 
  }

  closeModal() {
    this.isDialog=false
  }

  undoandclose() {
    Object.assign(this.gift, this.copyGift);
    
    this.closeModal();
  }
  validation_Name(name:string){
 let nameDouble= this.giftList.find(item=>item.giftName==name)
 if(nameDouble){
    return true;
 }
 return false;
}
 
handleFileInput(event: any) {
  const file: File = event.target.files[0];
  this.uploadFile(file);
}



uploadFile(file: File) {
  const formData: FormData = new FormData();
  formData.append('file', file, file.name);
  
  this.http.post<any>('https://localhost:44304/api/Gift/upload', formData).subscribe(
    (response) => {
      this.gift.giftImg = response.filePath;
    },
    (error) => {
      console.log(error);
    }
  );
}
// saveGift() {
//   this.http.post<any>('https://localhost:44304/api/Gift/add', this.gift).subscribe(
//     (response) => {
//       console.log('Gift saved:', response);
//     },
//     (error) => {
//       console.log(error);
//     }
//   );
// // }
// getImagePath() {
//   return 'assets/Images/' + this.gift.giftImg;
// }
  // Process the selected file here (e.g., upload it to a server or display a preview)
}

  