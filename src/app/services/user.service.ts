import { EventEmitter, Injectable } from '@angular/core';
import { login, singUp } from '../data-type';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  inValidUserAuth = new EventEmitter<boolean>(false);

  constructor(private http:HttpClient, private router: Router) { }

  userSignup(user: singUp) {
    this.http.post("http://localhost:3000/users", user, {observe: 'response'}).subscribe((result) => {
      if(result) {
        console.log(result);
        localStorage.setItem('user', JSON.stringify(result.body));
        this.router.navigate(['/']);
      }
    });
  }

  userLogin(data: login) {
    this.http.get<singUp[]>(`http://localhost:3000/users?email=${data.email}&password=${data.password}`, {observe: 'response'})
    .subscribe((result) => {
      if(result && result.body?.length) {
        this.inValidUserAuth.next(false);
        localStorage.setItem('user', JSON.stringify(result.body[0]));
        this.router.navigate(['/']);
      } else {
        this.inValidUserAuth.next(true);
      }
    })
  }

  userAuthReload() {
    if(localStorage.getItem('user')) {
      this.router.navigate(['/']);
    }
  }

}
