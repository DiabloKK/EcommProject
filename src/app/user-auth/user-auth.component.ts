import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { singUp } from '../data-type';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {

  constructor(private user: UserService) {

  }

  ngOnInit(): void {
      
  }

  signUp(data: singUp) {
    this.user.userSignup(data);
  }

}
