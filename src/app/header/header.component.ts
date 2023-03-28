import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  menuType: String = 'default';

  constructor(private route: Router) {

  }

  ngOnInit(): void {    
    this.route.events.subscribe((val: any) => {
      if(val.url) {
        console.warn(val.url);
        if(localStorage.getItem('seller') && val.url.includes('seller')) {
          this.menuType = "seller";
        } else {
          this.menuType = "default";
        }
      }
    })
  }

}
