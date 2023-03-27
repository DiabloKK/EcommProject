import { SingUp } from './../data-type';
import { SellerService } from './../services/seller.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent {

  constructor(private seller: SellerService, private router: Router) {

  }

  ngOnInit(): void {
    this.seller.reloadSeller();
  }

  signUp(data: SingUp): void {
    this.seller.userSignUp(data);
  }

}
