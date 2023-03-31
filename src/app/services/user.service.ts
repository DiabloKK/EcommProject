import { Injectable } from '@angular/core';
import { singUp } from '../data-type';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient, private router: Router) { }

  userSignup(user: singUp) {
    this.http.post("http://localhost:3000/users", user, {observe: 'response'}).subscribe((result) => {
      if(result) {
        localStorage.setItem('user', JSON.stringify(result));
        this.router.navigate(['/']);
      }
    });
  }

}
