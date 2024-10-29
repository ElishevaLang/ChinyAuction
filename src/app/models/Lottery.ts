import { Gift } from "./Gift";
import {User}  from "./User";

export class Lottery{

    lotteryId:number=0;
    gift:Gift=new Gift;
    user:User=new User();
    lotteryDate:Date=new Date;
}