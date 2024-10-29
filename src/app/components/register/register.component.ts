
import { UserServiceService } from 'src/app/services/user-service/user-service.service';
import { Component ,Input,Output,EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/User';
import { Router } from '@angular/router';
import { customPasswordValidator } from 'src/app/validators/customPasswordValidator';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  frmUserRegister: FormGroup = new FormGroup({});
  constructor(public userService:UserServiceService,private router: Router,) {
    this.frmUserRegister = new FormGroup({
      emailRegister: new FormControl('', [Validators.required, Validators.email]),
      passwordRegister: new FormControl('', [Validators.required,customPasswordValidator]),
      firstNameRegister: new FormControl('',[Validators.required]),
      lastNameRegister:new FormControl('',[Validators.required])
    })
   
  }
  userRegister:User=new User()
  register(){

    this.userService.addNewUser(this.userRegister).subscribe(res => {
      if (res) {
        this.userService.setUser()
       alert("משתמש "+res.userId+" נרשם בהצלחה!" )
       this.router.navigate(['login']);
      }
      else{

        alert("שגיאה" )

      }
    })
    
  }
  login(){

    this.router.navigate(['login']);
  }
}
