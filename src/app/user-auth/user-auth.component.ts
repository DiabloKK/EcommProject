import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { cart, login, product, singUp } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {

  showLogin:boolean = true;
  authError:string = "";

  constructor(private user: UserService, private product: ProductService) {

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
        this.authError = "User not found";
      } else {
        console.log(localStorage.getItem('user'));        
        this.localCartToRemoteCart();
      }
    });
  }

  openSignUp() {
    this.showLogin = false;
  }

  openLogin() {
    this.showLogin = true;
  }

  localCartToRemoteCart() {
    let data = localStorage.getItem('localCart');
    if(data) {
      let cartDataList: product[] = JSON.parse(data);
      let user = localStorage.getItem('user');
      let userId = user && JSON.parse(user).id;
        
      cartDataList.forEach((product: product, index) => {
        let cartData: cart = {
          ...product,
          productId: product.id,
          userId
        };

        delete cartData.id;
        setTimeout(() => {
          this.product.addToCart(cartData).subscribe((result) => {
            if(result) {
              console.warn("Item stored in DB");
            }
          });
          if(cartDataList.length === index + 1) {
            localStorage.removeItem('localCart');
          }
        }, 500);
      });
    }
  }

}
