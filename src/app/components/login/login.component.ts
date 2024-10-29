import { UserServiceService } from 'src/app/services/user-service/user-service.service';
import { Component ,Input,Output,EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/User';
import { Router } from '@angular/router';
import { customPasswordValidator } from 'src/app/validators/customPasswordValidator';
import {ButtonModule} from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { PrimeIcons, MenuItem } from 'primeng/api';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
frmUserLogin: FormGroup = new FormGroup({});

constructor(public userService:UserServiceService,private router: Router) {
    this.frmUserLogin = new FormGroup({
      emailLogin: new FormControl('', [Validators.required, Validators.email]),
      passwordLogin: new FormControl('', [Validators.required,customPasswordValidator]),
    })
  }
// ------------------------------------------------------------------------------------------

  emailLoginn: string="";
  passwordLoginn:string="";
// ------------------------------------------------------------------------------------------
  login(){

   this.userService.getUsersByEmailAndPassword(this.emailLoginn,this.passwordLoginn).subscribe((res => {
      if (res) {
        this.userService.setUser()
        console.log(res)
        localStorage.setItem("user",JSON.stringify(res))   
        this.router.navigate(['menu']);
       
      }
    else{

      this.router.navigate(['register']);
    }
    }))
  }
// ------------------------------------------------------------------------------------------
  register(){
    this.router.navigate(['register']);
  }
}
