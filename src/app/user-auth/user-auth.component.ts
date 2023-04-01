import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { login, singUp } from '../data-type';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {

  showLogin:boolean = true;
  authError:string = "";

  constructor(private user: UserService) {

  }

  ngOnInit(): void {
    this.user.userAuthReload();
  }

  signUp(data: singUp) {
    this.user.userSignup(data);
  }
  
  login(data: login) {
    this.user.userLogin(data);
    this.user.inValidUserAuth.subscribe((result) => {
      if(result) {
        this.authError = "Please enter valid user details"
      }
    })
  }

  openSignUp() {
    this.showLogin = false;
  }

  openLogin() {
    this.showLogin = true;
  }

}
