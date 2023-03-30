import { product } from './../data-type';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
// import { NavigationEnd, Router } from '@angular/router';
// import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  popularProducts: undefined | product[];
  trendyProducts: undefined | product[];

  constructor(private product: ProductService) {
    
  }

  ngOnInit(): void {
      this.product.popularProducts().subscribe((data) => {
        this.popularProducts = data;
      });

      this.product.trendyProducts().subscribe((data) => {
        this.trendyProducts = data;
      });

      // this.router.events.pipe(
      //   filter(event => event instanceof NavigationEnd)
      // ).subscribe(() => {
      //   this.ngOnInit();
      // });
  }

}
