import { singUp } from './../data-type';
import { SellerService } from './../services/seller.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit {

  constructor(private seller: SellerService, private router: Router) {

  }

  showLogin = true;
  authErorr = '';

  ngOnInit(): void {
    this.seller.reloadSeller();
  }

  signUp(data: singUp): void {
    console.warn(data);
    this.seller.userSignUp(data);
  }

  login(data: singUp): void {
    // console.warn(data);
    this.authErorr="";
    this.seller.userLogin(data);
    this.seller.isLoginError.subscribe((isErorr) => {
      if(isErorr) {
        this.authErorr="Email or password is correct";
      }
    });
  }

  openLogin() {
    this.showLogin = true;
  }

  openSignUp() {
    this.showLogin = false;
  }



}
