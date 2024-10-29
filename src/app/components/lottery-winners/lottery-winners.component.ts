import { Component } from '@angular/core';
import { Lottery } from 'src/app/models/Lottery';
import { LotteryService } from 'src/app/services/lottery-service/lottery.service';

@Component({
  selector: 'app-lottery-winners',
  templateUrl: './lottery-winners.component.html',
  styleUrls: ['./lottery-winners.component.css']
})
export class LotteryWinnersComponent {
  
  allLotterirs:Lottery[]=[]

  constructor(public lotterySrevice:LotteryService){}

  ngOnInit(){

    this.lotterySrevice.roaldLotteries$.subscribe(x => {
      this.lotterySrevice.getLottery().subscribe(res => {this.allLotterirs=res
      console.log(this.allLotterirs)
      }
        )
      })
  }
}
