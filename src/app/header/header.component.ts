import { product } from './../data-type';
import { ProductService } from './../services/product.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  menuType: String = 'default';
  sellerName: String = '';
  searchResult: undefined | product[];

  constructor(private route: Router, private product: ProductService) {

  }

  ngOnInit(): void {    
    this.route.events.subscribe((val: any) => {
      if(val.url) {
        // console.warn(val.url);
        if(localStorage.getItem('seller') && val.url.includes('seller')) {
          this.menuType = "seller";

          let sellerStore = localStorage.getItem('seller');
          let sellerData = sellerStore && JSON.parse(sellerStore)[0];
          this.sellerName = sellerData.name;
          
        } else {
          this.menuType = "default";
        }
      }
    })
  }

  logout() {
    localStorage.removeItem('seller');
    this.route.navigate(['/']);
  }

  searchProducts(query: KeyboardEvent) {
    if(query) {
      const element = query.target as HTMLInputElement;
      this.product.searchProducts(element.value).subscribe((result) => {
        if(result.length > 5) {
          result.length = 5
        }
        // console.log(result);
        this.searchResult = result;
      })
    }
  }

  hideSearch() {
    this.searchResult = undefined;
  }

  submitSearch(val: string) {
    this.route.navigate([`search/${val}`])
  }

}
